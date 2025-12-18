"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for background blur
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:py-6 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm" : ""
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group relative z-[101]">
                        <div className="bg-primary p-2.5 md:p-3 rounded-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Music className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground">SARGAM</span>
                    </Link>

                    {/* Desktop Menu */}
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

                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex bg-foreground text-background px-8 py-3.5 rounded-2xl font-black text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/10 items-center gap-2">
                            Invite Bot
                        </button>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative z-[101] p-2 -mr-2 text-foreground active:scale-90 transition-transform"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                            {["Features", "Spotify", "Commands", "Premium", "Docs"].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-full"
                                >
                                    <Link
                                        href={item === "Features" ? "#features" : `/${item.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center text-3xl font-black text-zinc-800 hover:text-primary transition-colors py-2"
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="w-full mt-8 bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
                            >
                                Invite Bot
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
