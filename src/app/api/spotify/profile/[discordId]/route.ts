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
        const profile = await spotifyFetch(discordId, "/me");

        // Return a simplified version for the bot
        return NextResponse.json({
            display_name: profile.display_name,
            email: profile.email,
            country: profile.country,
            product: profile.product,
            image_url: profile.images?.[0]?.url,
            followers: profile.followers?.total || 0,
            url: profile.external_urls?.spotify
        });
    } catch (error: any) {
        console.error("Spotify profile error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch Spotify profile" }, { status: 500 });
    }
}
