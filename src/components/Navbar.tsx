"use client";

import { motion } from "framer-motion";
import { Music, Plus } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                        <Music className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-foreground">SARGAM</span>
                </Link>

                <div className="hidden md:flex items-center gap-12 bg-white/60 backdrop-blur-3xl px-12 py-5 rounded-[2rem] border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                    {["Features", "Spotify", "Commands", "Premium", "Docs"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Features" ? "#features" : `/${item.toLowerCase()}`}
                            className="text-[12px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <button className="bg-foreground text-background px-10 py-4 rounded-2xl font-black text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/10 flex items-center gap-2">
                    Invite Bot
                </button>
            </div>
        </nav>
    );
}
