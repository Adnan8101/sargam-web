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

        // Construct Discord avatar URL if it's a hash
        let finalAvatar = connection.spotifyImage;
        if (!finalAvatar && connection.discordAvatar) {
            if (connection.discordAvatar.startsWith("http")) {
                finalAvatar = connection.discordAvatar;
            } else {
                finalAvatar = `https://cdn.discordapp.com/avatars/${discordId}/${connection.discordAvatar}.png`;
            }
        }

        return NextResponse.json({
            connected: true,
            discordId,
            username: connection.spotifyDisplayName || connection.discordUsername,
            avatar: finalAvatar,
            spotifyName: connection.spotifyDisplayName
        });
    } catch (error) {
        console.error("Error in /api/auth/me:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
