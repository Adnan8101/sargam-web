"use client";

import { Music, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-zinc-50 pt-32 pb-16 px-6 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
                    <div className="space-y-8 max-w-md">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                                <Music className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-black tracking-tighter">SARGAM</span>
                        </Link>
                        <p className="text-lg text-zinc-500 font-bold leading-relaxed">
                            Listen to everything, together. The most powerful music system built for Discord communities.
                        </p>
                        <div className="pt-4">
                            <Link
                                href="https://discord.gg/exeop"
                                target="_blank"
                                className="text-xs font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity flex items-center gap-2"
                            >
                                Developed and Maintained by Extereme Official <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Platform</span>
                        <ul className="space-y-6 text-sm font-black">
                            <Link href="#features" className="block hover:text-primary transition-colors text-foreground/70">Capabilities</Link>
                            <Link href="/premium" className="block hover:text-primary transition-colors text-foreground/70">Premium Upgrade</Link>
                            <Link href="/docs" className="block hover:text-primary transition-colors text-foreground/70">Documentation</Link>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-16 border-t border-border">
                    <div className="flex flex-wrap items-center justify-center gap-10">
                        <span className="text-[11px] font-black uppercase tracking-widest opacity-30 text-zinc-500">© 2025 SARGAM AUDIO HQ</span>
                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors">Terms</Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
