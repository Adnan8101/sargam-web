"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Music, ExternalLink, User, LogOut, Disc3, Zap } from "lucide-react";
import Link from "next/link";

interface UserInfo {
    username: string | null;
    avatar: string | null;
    spotifyId: string | null;
    spotifyName: string | null;
    spotifyImage: string | null;
    connected: boolean;
}

export default function SpotifySuccessPage() {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Disc3 className="w-12 h-12 text-primary animate-spin" />
                    <p className="font-bold text-zinc-500">Verifying Connection...</p>
                </div>
            </div>
        );
    }

    const displayName = user?.spotifyName || user?.username || "Friend";
    const profileImage = user?.spotifyImage || user?.avatar;

    return (
        <main className="min-h-screen bg-[#F7F7F7]">
            <Navbar />

            <div className="pt-40 pb-20 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="relative inline-block">
                        <div className="inline-flex p-6 rounded-[2.5rem] bg-green-500/10 text-green-500 mb-4 animate-bounce">
                            <CheckCircle2 size={64} strokeWidth={2.5} />
                        </div>
                        {profileImage && (
                            <img
                                src={profileImage}
                                alt="Profile Avatar"
                                className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full border-4 border-[#F7F7F7] shadow-lg"
                            />
                        )}
                    </div>

                    <h1 className="text-6xl font-black tracking-tighter text-foreground">
                        Hello, <span className="text-primary italic">{displayName}</span>!
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Your Spotify account {user?.spotifyId && <span className="text-green-500 font-bold">({user.spotifyId})</span>} has been linked to Sargam.
                    </p>

                    <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-black/5 border border-border/40 text-left space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-zinc-50 opacity-10 rotate-12">
                            <Music size={120} />
                        </div>

                        <h3 className="font-black text-2xl flex items-center gap-3 text-foreground">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <Zap size={24} />
                            </div>
                            Ready to use in Discord
                        </h3>

                        <div className="grid gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:border-primary/20 transition-all">
                                <div className="p-3 rounded-xl bg-white shadow-sm text-primary font-bold text-xs uppercase tracking-widest">/spotify-playlists</div>
                                <p className="text-sm font-bold text-muted-foreground">Browse and play your personal playlists</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:border-primary/20 transition-all">
                                <div className="p-3 rounded-xl bg-white shadow-sm text-primary font-bold text-xs uppercase tracking-widest">/spotify-liked</div>
                                <p className="text-sm font-bold text-muted-foreground">Instantly play your library of liked tracks</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:border-primary/20 transition-all">
                                <div className="p-3 rounded-xl bg-white shadow-sm text-primary font-bold text-xs uppercase tracking-widest">/spotify-info</div>
                                <p className="text-sm font-bold text-muted-foreground">View your Spotify stats and profile info</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            onClick={() => window.close()}
                            className="bg-foreground text-background px-12 py-5 rounded-full font-black text-lg hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-black/10 flex items-center gap-3 mx-auto"
                        >
                            <LogOut size={20} />
                            Return to Discord
                        </button>
                    </div>

                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        Connection established safely via OAuth 2.0
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
