import { NextRequest, NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get("timeframe") || "medium_term";
    const discordId = searchParams.get("discord_id");

    const apiKey = request.headers.get("X-API-Key");
    if (process.env.BOT_API_KEY && apiKey !== process.env.BOT_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!discordId) {
        return NextResponse.json({ error: "Missing discord_id" }, { status: 400 });
    }

    // Map timeframe names from bot to Spotify timeframe
    const timeRangeMap: Record<string, string> = {
        "short": "short_term",
        "medium": "medium_term",
        "long": "long_term"
    };

    const spTimeframe = timeRangeMap[timeframe] || timeframe;

    try {
        const topItems = await spotifyFetch(discordId, `/me/top/${type}?time_range=${spTimeframe}&limit=20`);

        return NextResponse.json({
            items: topItems.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                artist: type === "tracks" ? item.artists[0].name : undefined,
                url: item.external_urls.spotify,
                image_url: type === "tracks" ? item.album.images[0]?.url : item.images?.[0]?.url
            }))
        });
    } catch (error: any) {
        console.error(`Spotify top ${type} error:`, error);
        return NextResponse.json({ error: error.message || `Failed to fetch top ${type}` }, { status: 500 });
    }
}
