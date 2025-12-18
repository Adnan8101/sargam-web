"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const featureGroups = [
    {
        title: "High Fidelity Core",
        desc: "Studio-quality playback that stays true to the source. experience music exactly how it was meant to be heard.",
        svg: "/icons/Music-bro.svg",
        features: ["320kbps AAC Encoding", "Bit-Perfect Transmission", "Dynamic Range Control"]
    },
    {
        title: "Global Distribution",
        desc: "Our server network ensures the lowest possible latency for every listener, regardless of location.",
        svg: "/icons/Server-amico.svg",
        features: ["Sub-15ms Latency", "Proximity Smart Routing", "99.9% Uptime SLA"]
    },
    {
        title: "Universal Bridge",
        desc: "Seamlessly connect and play from any platform. Spotify, SoundCloud, or your own local collection.",
        svg: "/icons/Playing Music-rafiki.svg",
        features: ["Playlist Synchronization", "Cross-Platform Links", "Cloud Music Import"]
    },
    {
        title: "Precision Controls",
        desc: "Advanced audio processing tools at your fingertips. Master your voice channel like a studio engineer.",
        svg: "/icons/Preferences-rafiki.svg",
        features: ["Parametric EQ", "Bass Boost Pro", "Volume Normalization"]
    },
    {
        title: "Smart Discovery",
        desc: "Intelligent queueing systems that learn your community's vibe and keep the music flowing.",
        svg: "/icons/Record player-amico.svg",
        features: ["AI Mood Detection", "Auto-Queue Smart Mix", "Listener Interaction"]
    },
    {
        title: "Social Experience",
        desc: "Built for Discord communities. Share playback controls or host dedicated listening parties.",
        svg: "/icons/Usability testing-bro.svg",
        features: ["Multi-DJ Sessions", "Real-time Lyrics", "Poll-Based Queuing"]
    }
];

function FeatureCard({ group, index }: { group: typeof featureGroups[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"] // Start animation when card enters viewport
    });

    // Zoom In effect: Scale from 0.8 to 1 as it scrolls into view
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
            className="feature-card group flex flex-col hover:border-primary/10 will-change-transform"
        >
            <div className="relative w-full h-[320px] mb-12 rounded-[2.5rem] overflow-hidden bg-white border border-border group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all flex items-center justify-center p-12">
                <Image
                    src={group.svg}
                    alt=""
                    width={350}
                    height={350}
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            <h3 className="text-3xl font-black mb-6 tracking-tight text-foreground">{group.title}</h3>
            <p className="text-lg text-muted-foreground font-bold leading-relaxed mb-8 flex-grow">
                {group.desc}
            </p>

            <div className="grid grid-cols-1 gap-4 pt-8 border-t border-border">
                {group.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-black text-zinc-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function LargeFeatureBlock() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.8 1"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className="bg-primary p-16 rounded-[4rem] col-span-1 md:col-span-2 flex flex-col lg:flex-row items-center justify-between gap-16 text-white shadow-3xl shadow-primary/20 will-change-transform"
        >
            <div className="space-y-8 flex-1">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter">Everything working, <br /> exactly as you want.</h3>
                <p className="text-xl font-bold opacity-80 max-w-md">Our systems are integrated for a flawless, lag-free music experience in Discord. Always stable, always premium.</p>
                <button className="bg-white text-primary px-10 py-4 rounded-full font-black text-lg hover:bg-zinc-100 transition-colors flex items-center gap-3 w-fit">
                    Try All Modules <ArrowRight className="w-5 h-5" />
                </button>
            </div>
            <div className="relative w-full lg:w-[45%] h-[400px]">
                <Image
                    src="/icons/Music-rafiki.svg"
                    alt=""
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>
        </motion.div>
    )
}

export default function Features() {
    return (
        <section id="features" className="py-40 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32">
                    <span className="text-primary font-black tracking-widest uppercase text-sm mb-6 block">Capabilities</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl text-foreground">
                        ENGINEERED FOR THE <br />
                        <span className="text-zinc-400">PUREST EXPERIENCE.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {featureGroups.map((group, i) => (
                        <FeatureCard key={i} group={group} index={i} />
                    ))}

                    {/* Special High-Contrast Feature Block (Fixed Icon) */}
                    <LargeFeatureBlock />
                </div>
            </div>
        </section>
    );
}
