import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const cookieStore = await cookies();
    const discordId = cookieStore.get("discord_id")?.value || state;
    const discordUsername = cookieStore.get("discord_username")?.value;
    const discordAvatar = cookieStore.get("discord_avatar")?.value;

    if (!code || !discordId) {
        return NextResponse.json({ error: "Missing code or discord_id" }, { status: 400 });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sargam-web.vercel.app'}/api/auth/callback/spotify`;

    try {
        // 1. Exchange code for tokens
        const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
            }),
        });

        const tokens = await tokenResponse.json();
        if (!tokenResponse.ok) {
            console.error("Spotify token error:", tokens);
            return NextResponse.json(tokens, { status: tokenResponse.status });
        }

        // 2. Get Spotify user info
        const userResponse = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        const spotifyUser = await userResponse.json();
        const spotifyUserId = spotifyUser.id;
        const spotifyDisplayName = spotifyUser.display_name;
        const spotifyImage = spotifyUser.images?.[0]?.url;

        // 3. Save to database
        const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

        await prisma.spotifyConnection.upsert({
            where: { discordId },
            update: {
                spotifyUserId,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiresAt,
                discordUsername,
                discordAvatar,
                isActive: true,
            },
            create: {
                discordId,
                spotifyUserId,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiresAt,
                discordUsername,
                discordAvatar,
                isActive: true,
            },
        });

        // 4. Notify the bot via webhook
        const botWebhookUrl = process.env.BOT_WEBHOOK_URL || "http://localhost:3001";
        try {
            await fetch(`${botWebhookUrl}/webhook/spotify-connected`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": process.env.BOT_API_KEY || "",
                },
                body: JSON.stringify({
                    discord_id: discordId,
                    spotify_user: spotifyDisplayName,
                    spotify_image: spotifyImage,
                }),
            });
        } catch (e) {
            console.error("Failed to notify bot:", e);
            // Don't fail the whole request if the bot notification fails
        }

        // 5. Redirect to success page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://sargam-web.vercel.app'}/spotify/success`);
    } catch (error) {
        console.error("Spotify callback error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
