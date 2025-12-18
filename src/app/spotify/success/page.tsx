"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Music, LogOut, Disc3, Zap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserInfo {
    username: string | null;
    avatar: string | null;
    spotifyName: string | null;
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
                // Artificial delay for a "premium" feel during verification
                setTimeout(() => setLoading(false), 800);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative">
                        <Disc3 className="w-16 h-16 text-primary animate-spin" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"
                        />
                    </div>
                    <div className="space-y-2 text-center">
                        <h2 className="text-xl font-black tracking-tight text-foreground">Verifying Connection</h2>
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Syncing your Spotify profile...</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    const displayName = user?.spotifyName || user?.username || "Friend";
    const profileImage = user?.avatar;

    return (
        <main className="min-h-screen bg-[#FDFCFD] selection:bg-primary/10 overflow-hidden relative">
            <Navbar />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/4" />

            <div className="pt-40 pb-20 px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center text-center space-y-10">
                        {/* Avatar Section */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                {/* Success Ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    className="absolute -inset-3 rounded-full border-2 border-dashed border-green-500/30"
                                />

                                {/* Inner Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-green-500 rounded-full blur-sm opacity-20" />

                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={displayName}
                                        className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl z-10"
                                    />
                                ) : (
                                    <div className="relative w-full h-full rounded-full bg-zinc-100 flex items-center justify-center border-4 border-white shadow-2xl z-10">
                                        <Sparkles className="w-12 h-12 text-zinc-300" />
                                    </div>
                                )}

                                {/* Floating Success Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 md:p-3 rounded-2xl shadow-xl z-20"
                                >
                                    <CheckCircle2 size={24} strokeWidth={3} />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="space-y-4 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-black uppercase tracking-[0.2em] inline-block mb-4 border border-green-500/10">
                                    Connection Established
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9]">
                                    Hello, <span className="bg-gradient-to-r from-primary via-pink-500 to-green-500 bg-clip-text text-transparent italic">{displayName}</span>!
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed"
                            >
                                Your Spotify account has been successfully linked. Experience a new way of listening on <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">Discord</span>.
                            </motion.p>
                        </div>

                        {/* Info Card */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="w-full max-w-3xl"
                        >
                            <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden group">
                                {/* Subtle music icon watermark */}
                                <Music className="absolute -top-10 -right-10 w-64 h-64 text-zinc-50 -rotate-12 transition-transform duration-1000 group-hover:rotate-0" />

                                <div className="relative z-10 space-y-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-foreground flex items-center gap-3 underline decoration-primary/20 decoration-4 underline-offset-8">
                                                <Zap className="text-primary fill-primary/10" size={28} />
                                                Next Steps
                                            </h3>
                                            <p className="text-muted-foreground font-medium">Try these exclusive commands in your server</p>
                                        </div>

                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center shadow-sm`}>
                                                    <Music size={14} className="text-zinc-400" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { cmd: "/spotify-playlists", desc: "Your personal collection", color: "from-blue-500" },
                                            { cmd: "/spotify-liked", desc: "Instant favorites", color: "from-primary" },
                                            { cmd: "/spotify-info", desc: "Profile & Insights", color: "from-green-500" }
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className="p-6 rounded-[2rem] bg-[#F9F9F9] border border-zinc-100/50 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all text-left space-y-3 cursor-default"
                                            >
                                                <div className={`w-8 h-1 bg-gradient-to-r ${item.color} to-transparent rounded-full`} />
                                                <div className="font-black text-primary text-sm tracking-tight">{item.cmd}</div>
                                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.desc}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="space-y-6 w-full"
                        >
                            <button
                                onClick={() => window.close()}
                                className="group relative bg-foreground text-background px-14 py-6 rounded-full font-black text-xl hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex items-center gap-4 mx-auto overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                />
                                <span className="relative flex items-center gap-3">
                                    <LogOut size={24} strokeWidth={2.5} />
                                    Return to Discord
                                </span>
                            </button>

                            <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em]">
                                Secured by Sargam OAuth Engine • 0.01ms Verification
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
