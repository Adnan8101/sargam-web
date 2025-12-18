"use client";

import { motion } from "framer-motion";
import { Music, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ComingSoon() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <section className="pt-60 pb-40 px-6 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-12"
                >
                    <Music className="w-10 h-10 text-primary" />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
                    COMING <br /> <span className="text-primary">SOON.</span>
                </h1>

                <p className="text-xl text-muted-foreground font-bold mb-16 max-w-md">
                    We're engineering the next generation of this module. Stay tuned for the 2025 release.
                </p>

                <Link href="/" className="btn-secondary">
                    <ArrowLeft className="w-5 h-5" />
                    Back To Home
                </Link>
            </section>
            <Footer />
        </main>
    );
}
