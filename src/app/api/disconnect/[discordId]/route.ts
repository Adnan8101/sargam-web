import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ discordId: string }> }
) {
    const { discordId } = await params;

    if (!discordId) {
        return NextResponse.json({ error: "Missing discord_id" }, { status: 400 });
    }

    // API Key protection
    const apiKey = request.headers.get("X-API-Key");
    if (process.env.BOT_API_KEY && apiKey !== process.env.BOT_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const userId = BigInt(discordId);

        // Find all personal playlists for this user to delete related records
        const userPlaylists = await prisma.personalPlaylist.findMany({
            where: { userId },
            select: { id: true }
        });
        const playlistIds = userPlaylists.map(p => p.id);

        await prisma.$transaction(async (tx) => {
            // 1. Delete Personal Playlist related data
            if (playlistIds.length > 0) {
                await tx.personalPlaylistTrack.deleteMany({ where: { playlistId: { in: playlistIds } } });
                await tx.personalPlaylistShare.deleteMany({ where: { playlistId: { in: playlistIds } } });
                await tx.personalPlaylistImport.deleteMany({ where: { playlistId: { in: playlistIds } } });
                await tx.personalPlaylistStats.deleteMany({ where: { playlistId: { in: playlistIds } } });
                await tx.smartPlaylistSeed.deleteMany({ where: { playlistId: { in: playlistIds } } });
                await tx.personalPlaylist.deleteMany({ where: { id: { in: playlistIds } } });
            }

            // 2. Delete User Stats & History
            await tx.userListeningHistory.deleteMany({ where: { userId } });
            await tx.userStatistics.deleteMany({ where: { userId } });
            await tx.userMusicStats.deleteMany({ where: { userId } });
            await tx.userTopTrack.deleteMany({ where: { userId } });
            await tx.userTopArtist.deleteMany({ where: { userId } });
            await tx.userVoiceStats.deleteMany({ where: { userId } });
            await tx.userCommandStats.deleteMany({ where: { userId } });
            await tx.playSession.deleteMany({ where: { requestedByUserId: userId } });
            await tx.voiceSession.deleteMany({ where: { userId } });
            await tx.commandExecution.deleteMany({ where: { userId } });

            // 3. Delete Favorites
            await tx.userFavorite.deleteMany({ where: { userId } });

            // 4. Delete Spotify specific data
            await tx.spotifyUserStats.deleteMany({ where: { discordUserId: userId } });
            await tx.spotifyConnection.deleteMany({ where: { discordId } });

            // 5. Delete Identity
            await tx.userIdentity.deleteMany({ where: { discordUserId: userId } });
        });

        return NextResponse.json({ success: true, message: "All user data wiped successfully" });
    } catch (error) {
        console.error("Error wiping user data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
