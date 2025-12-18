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
        const liked = await spotifyFetch(discordId, "/me/tracks?limit=50");

        return NextResponse.json({
            total: liked.total,
            tracks: liked.items.map((item: any) => ({
                id: item.track.id,
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                url: item.track.external_urls.spotify,
                duration_ms: item.track.duration_ms,
                image_url: item.track.album.images[0]?.url
            }))
        });
    } catch (error: any) {
        console.error("Spotify liked error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch liked songs" }, { status: 500 });
    }
}
