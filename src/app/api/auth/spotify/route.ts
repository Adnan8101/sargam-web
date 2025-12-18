import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const discord_id = searchParams.get("discord_id");
    const username = searchParams.get("username");
    const avatar = searchParams.get("avatar");

    if (!discord_id) {
        return NextResponse.json({ error: "Missing discord_id" }, { status: 400 });
    }

    // Store user info in cookies for the callback
    const cookieStore = await cookies();
    cookieStore.set("discord_id", discord_id, { maxAge: 3600, path: "/" });
    if (username) cookieStore.set("discord_username", username, { maxAge: 3600, path: "/" });
    if (avatar) cookieStore.set("discord_avatar", avatar, { maxAge: 3600, path: "/" });

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sargam-web.vercel.app'}/api/auth/callback/spotify`;

    const scopes = [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-read-currently-playing",
        "user-read-playback-state"
    ].join(" ");

    const spotifyAuthUrl = new URL("https://accounts.spotify.com/authorize");
    spotifyAuthUrl.searchParams.set("client_id", clientId || "");
    spotifyAuthUrl.searchParams.set("response_type", "code");
    spotifyAuthUrl.searchParams.set("redirect_uri", redirectUri);
    spotifyAuthUrl.searchParams.set("scope", scopes);
    spotifyAuthUrl.searchParams.set("state", discord_id); // Use discord_id as state for basic verification

    return NextResponse.redirect(spotifyAuthUrl.toString());
}
