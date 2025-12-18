"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Plus, Play, Music } from "lucide-react";

export default function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 50]);
    const rotateY = useTransform(scrollY, [0, 500], [0, 10]);

    return (
        <section className="relative pt-48 pb-32 px-6 bg-white overflow-hidden min-h-[95vh] flex items-center">
            {/* Cinematic Background Audio-Visualizer Style Glows */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.08, 0.03]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] aspect-square bg-primary rounded-full blur-[160px] will-change-transform"
                />
                <motion.div
                    animate={{
                        x: [-20, 20, -20],
                        y: [-10, 10, -10]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] will-change-transform"
                />
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

                {/* Left Side: Content */}
                <div className="text-left space-y-12 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-[11px] font-black tracking-[0.3em] uppercase text-primary"
                    >
                        <div className="w-8 h-px bg-primary/30" />
                        <span>Pure Sonic v3.2</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-heading"
                    >
                        LISTEN TO <br />
                        <span className="text-primary">EVERYTHING.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-xl md:text-2xl text-muted-foreground font-bold leading-tight max-w-xl"
                    >
                        Sargam delivers high-fidelity 320kbps audio to your Discord server.
                        Precision engineered for communities that care about sound.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <button className="btn-primary w-full sm:w-auto relative group overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                Invite Sargam <Plus className="w-5 h-5" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                        <button className="btn-secondary w-full sm:w-auto group">
                            <Play className="w-5 h-5 fill-current text-primary group-hover:scale-110 transition-transform" />
                            Experience Sargam
                        </button>
                    </motion.div>
                </div>

                {/* Right Side: Cinematic Custom Video Asset */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end will-change-transform"
                    style={{ y, rotateY }}
                >
                    {/* Rhythmic Glow (Music Pulse) */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-radial-gradient from-primary/30 to-transparent blur-[120px] -z-10"
                    />

                    <div className="relative w-full max-w-[1200px] lg:scale-125 lg:translate-x-12 aspect-[16/9] flex items-center justify-center mask-radial">
                        <video
                            src="/videos/hero-animation.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover mix-blend-multiply contrast-[1.02] brightness-[1.02]"
                        />

                        {/* Ambient Particles (Vibe) */}
                        <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                        <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                            className="absolute bottom-1/3 right-0 w-3 h-3 bg-primary/40 rounded-full blur-[4px]"
                        />
                    </div>
                </motion.div>            </div>
        </section>
    );
}
