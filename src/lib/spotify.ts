import { prisma } from "./prisma";

export async function getValidAccessToken(discordId: string) {
    const connection = await prisma.spotifyConnection.findUnique({
        where: { discordId }
    });

    if (!connection) {
        throw new Error("No Spotify connection found");
    }

    // Check if token is expired or about to expire (within 5 minutes)
    const now = new Date();
    const expiryDate = new Date(connection.expiresAt);
    const isExpired = expiryDate.getTime() - now.getTime() < 5 * 60 * 1000;

    if (!isExpired) {
        return connection.accessToken;
    }

    // Refresh token
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Missing Spotify credentials");
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: connection.refreshToken,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Failed to refresh Spotify token:", data);
        throw new Error("Failed to refresh Spotify token");
    }

    const newAccessToken = data.access_token;
    const newExpiresAt = new Date(Date.now() + data.expires_in * 1000);

    // Update database
    await prisma.spotifyConnection.update({
        where: { discordId },
        data: {
            accessToken: newAccessToken,
            expiresAt: newExpiresAt,
            refreshToken: data.refresh_token || connection.refreshToken, // Spotify might return a new refresh token
        }
    });

    return newAccessToken;
}

export async function spotifyFetch(discordId: string, endpoint: string) {
    const token = await getValidAccessToken(discordId);

    // Ensure endpoint starts with / and doesn't have full URL
    const url = endpoint.startsWith("http") ? endpoint : `https://api.spotify.com/v1${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        console.error(`Spotify API error (${endpoint}):`, error);
        throw new Error(error.error?.message || "Spotify API call failed");
    }

    return response.json();
}
