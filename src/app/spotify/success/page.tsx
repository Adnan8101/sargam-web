"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Music, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SpotifySuccessPage() {
    return (
        <main className="min-h-screen bg-[#F7F7F7]">
            <Navbar />

            <div className="pt-40 pb-20 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="inline-flex p-6 rounded-[2.5rem] bg-green-500/10 text-green-500 mb-4 animate-bounce">
                        <CheckCircle2 size={64} strokeWidth={2.5} />
                    </div>

                    <h1 className="text-6xl font-black tracking-tighter text-foreground">
                        Spotify <span className="text-green-500 italic">Connected</span>!
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Your Spotify account has been successfully linked to Sargam. You can now use all premium Spotify commands in Discord.
                    </p>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-border/50 text-left space-y-4">
                        <h3 className="font-black text-xl flex items-center gap-2">
                            <Music size={24} className="text-primary" />
                            Try these commands in Discord:
                        </h3>
                        <ul className="space-y-3 text-muted-foreground font-medium">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <code className="text-primary font-bold">/spotify-playlists</code> — Browse your playlists
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <code className="text-primary font-bold">/spotify-liked</code> — Play your liked songs
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <code className="text-primary font-bold">/spotify-info</code> — View your profile
                            </li>
                        </ul>
                    </div>

                    <div className="pt-8">
                        <button
                            onClick={() => window.close()}
                            className="bg-foreground text-background px-12 py-5 rounded-full font-black text-lg hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-black/10 flex items-center gap-3 mx-auto"
                        >
                            Close this window
                        </button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        You can return to Discord now.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
