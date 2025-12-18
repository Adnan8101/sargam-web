import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: { discordId: string } }
) {
    const { discordId } = params;

    if (!discordId) {
        return NextResponse.json({ connected: false }, { status: 400 });
    }

    // Basic API Key protection if needed
    const apiKey = request.headers.get("X-API-Key");
    if (process.env.BOT_API_KEY && apiKey !== process.env.BOT_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const connection = await prisma.spotifyConnection.findUnique({
            where: { discordId },
            select: {
                isActive: true,
                expiresAt: true,
            }
        });

        if (!connection) {
            return NextResponse.json({ connected: false });
        }

        const isExpired = connection.expiresAt < new Date();

        return NextResponse.json({
            connected: connection.isActive && !isExpired
        });
    } catch (error) {
        console.error("Error checking connection:", error);
        return NextResponse.json({ connected: false, error: "Database error" }, { status: 500 });
    }
}
