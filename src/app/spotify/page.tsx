"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music, Heart, Zap, Star, Headphones, Lock, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SpotifyContent() {
    const searchParams = useSearchParams();
    const discordId = searchParams.get("discord_id");
    const username = searchParams.get("username");

    const handleConnect = () => {
        if (discordId) {
            window.location.href = `/api/auth/spotify?${searchParams.toString()}`;
        } else {
            alert("Please use the /spotify-connect command in your Discord server to start the connection process.");
        }
    };

    return (
        <main className="min-h-screen bg-[#F7F7F7]">
            <Navbar />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side: Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                <Music size={16} />
                                <span>Spotify Integration</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
                                Connect Your <span className="text-primary italic">Spotify</span> Account.
                            </h1>

                            {username ? (
                                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                                    Hi <span className="text-primary font-bold">{username}</span>! Link your account to sync your playlists and get personalized recommendations directly in Discord.
                                </p>
                            ) : (
                                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                                    Unlock the full potential of Sargam. Link your account to sync your playlists, liked songs, and get personalized recommendations directly in Discord.
                                </p>
                            )}

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm text-primary">
                                        <Heart size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Liked Songs</h3>
                                        <p className="text-sm text-muted-foreground">Sync your library</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm text-primary">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Fast Play</h3>
                                        <p className="text-sm text-muted-foreground">Instant streaming</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm text-primary">
                                        <Star size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Top Content</h3>
                                        <p className="text-sm text-muted-foreground">Your favorites first</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm text-primary">
                                        <Headphones size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Autoplay</h3>
                                        <p className="text-sm text-muted-foreground">Tailored taste</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={handleConnect}
                                    className="bg-[#1DB954] text-white px-10 py-5 rounded-full font-black text-xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-[#1DB954]/20 flex items-center gap-4"
                                >
                                    <Music size={24} />
                                    Connect with Spotify
                                </button>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                                <div className="flex items-center gap-1">
                                    <Lock size={14} className="text-primary" />
                                    <span>Secure OAuth 2.0</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 size={14} className="text-primary" />
                                    <span>Read-only access</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Visual Element */}
                        <div className="relative">
                            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary to-pink-500 p-1 shadow-2xl overflow-hidden floating-3d">
                                <div className="w-full h-full bg-white rounded-[2.8rem] flex items-center justify-center p-12">
                                    <img
                                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                                        alt="Spotify Logo"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default function SpotifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-zinc-500">Loading Spotify Integration...</p>
                </div>
            </div>
        }>
            <SpotifyContent />
        </Suspense>
    );
}
