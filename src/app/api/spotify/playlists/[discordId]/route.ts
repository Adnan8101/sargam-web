import { NextRequest, NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ discordId: string }> }
) {
    const { discordId } = await params;

    const apiKey = request.headers.get("X-API-Key");
    if (process.env.BOT_API_KEY && apiKey !== process.env.BOT_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const playlists = await spotifyFetch(discordId, "/me/playlists?limit=50");

        return NextResponse.json({
            total: playlists.total,
            playlists: playlists.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                owner: item.owner.display_name,
                track_count: item.tracks.total,
                url: item.external_urls.spotify,
                image_url: item.images?.[0]?.url
            }))
        });
    } catch (error: any) {
        console.error("Spotify playlists error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch playlists" }, { status: 500 });
    }
}
