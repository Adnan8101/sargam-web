import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const discordId = cookieStore.get("discord_id")?.value;

        if (!discordId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const connection = await prisma.spotifyConnection.findUnique({
            where: { discordId },
            select: {
                spotifyUserId: true,
                discordUsername: true,
                discordAvatar: true,
                spotifyDisplayName: true,
                spotifyImage: true,
                isActive: true,
            }
        });

        if (!connection || !connection.isActive) {
            return NextResponse.json({ connected: false });
        }

        return NextResponse.json({
            connected: true,
            discordId,
            username: connection.discordUsername,
            avatar: connection.discordAvatar,
            spotifyId: connection.spotifyUserId,
            spotifyName: connection.spotifyDisplayName,
            spotifyImage: connection.spotifyImage
        });
    } catch (error) {
        console.error("Error in /api/auth/me:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
