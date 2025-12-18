"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Copy, Check, Music, ListMusic, User, Settings, Info, Zap, LayoutGrid } from "lucide-react";

const COMMAND_CATEGORIES = [
    { id: "music", name: "Music", icon: Music },
    { id: "queue", name: "Queue", icon: ListMusic },
    { id: "spotify", name: "Spotify", icon: Zap },
    { id: "playlist", name: "Playlist", icon: LayoutGrid },
    { id: "user", name: "User", icon: User },
    { id: "info", name: "Information", icon: Info },
];

const COMMANDS_DATA = {
    music: [
        { name: "play", description: "Play a song from YouTube or Spotify", aliases: ["p"], example: "/play song: Shape of You" },
        { name: "skip", description: "Skip the currently playing song", aliases: ["s", "next"], example: "/skip" },
        { name: "stop", description: "Stop the music and clear the queue", aliases: ["st"], example: "/stop" },
        { name: "pause", description: "Pause the current playback", aliases: [], example: "/pause" },
        { name: "resume", description: "Resume the paused playback", aliases: [], example: "/resume" },
        { name: "volume", description: "Adjust the bot's volume (0-100)", aliases: ["v"], example: "/volume level: 75" },
        { name: "join", description: "Make the bot join your voice channel", aliases: ["j"], example: "/join" },
        { name: "leave", description: "Make the bot leave the voice channel", aliases: ["dc"], example: "/leave" },
        { name: "nowplaying", description: "Show details of the current song", aliases: ["np"], example: "/nowplaying" },
    ],
    queue: [
        { name: "queue", description: "Show the current music queue", aliases: ["q"], example: "/queue" },
        { name: "shuffle", description: "Shuffle the current queue", aliases: ["sh"], example: "/shuffle" },
        { name: "loop", description: "Toggle looping for track or queue", aliases: ["l"], example: "/loop mode: TRACK" },
        { name: "clear", description: "Clear all tracks from the queue", aliases: ["cq"], example: "/clear" },
        { name: "remove", description: "Remove a specific track from the queue", aliases: ["rm"], example: "/remove index: 3" },
        { name: "skipto", description: "Skip to a specific track in the queue", aliases: ["st"], example: "/skipto index: 5" },
    ],
    spotify: [
        { name: "spotify-connect", description: "Connect your Spotify account", aliases: [], example: "/spotify-connect" },
        { name: "spotify-status", description: "Check your Spotify connection status", aliases: [], example: "/spotify-status" },
        { name: "spotify-playlists", description: "Browse your Spotify playlists", aliases: [], example: "/spotify-playlists" },
        { name: "spotify-liked", description: "Play your Spotify liked songs", aliases: [], example: "/spotify-liked" },
        { name: "spotify-disconnect", description: "Unlink your Spotify account", aliases: [], example: "/spotify-disconnect" },
    ],
    playlist: [
        { name: "playlist-create", description: "Create a new custom playlist", aliases: [], example: "/playlist-create name: Party" },
        { name: "playlist-add", description: "Add current song to a playlist", aliases: [], example: "/playlist-add name: Party" },
        { name: "playlist-list", description: "List all your saved playlists", aliases: [], example: "/playlist-list" },
        { name: "playlist-play", description: "Play one of your saved playlists", aliases: [], example: "/playlist-play name: Party" },
        { name: "playlist-delete", description: "Delete a saved playlist", aliases: [], example: "/playlist-delete name: Party" },
    ],
    user: [
        { name: "profile", description: "View your music listening profile", aliases: [], example: "/profile" },
        { name: "leaderboard", description: "View the top listeners in the server", aliases: ["lb"], example: "/leaderboard" },
        { name: "top", description: "View your top played tracks", aliases: [], example: "/top" },
        { name: "recently-played", description: "Show tracks you played recently", aliases: ["rp"], example: "/recently-played" },
    ],
    info: [
        { name: "ping", description: "Check the bot's latency", aliases: [], example: "/ping" },
        { name: "about", description: "Information about Sargam", aliases: ["info"], example: "/about" },
        { name: "help", description: "Show the help menu", aliases: ["h"], example: "/help" },
        { name: "lyrics", description: "Get lyrics for a song", aliases: ["ly"], example: "/lyrics song: Starboy" },
    ],
};

export default function CommandsPage() {
    const [activeCategory, setActiveCategory] = useState("music");
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(id);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const filteredCommands = COMMANDS_DATA[activeCategory as keyof typeof COMMANDS_DATA].filter(
        (cmd) =>
            cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#F7F7F7]">
            <Navbar />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-6xl font-black tracking-tighter text-foreground">
                            Bot <span className="text-primary italic">Commands</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Master Sargam with our comprehensive list of commands. Simple, powerful, and easy to use.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="lg:w-64 space-y-2">
                            {COMMAND_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeCategory === cat.id
                                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                                : "bg-white text-muted-foreground hover:bg-zinc-100"
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for a command..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border-2 border-border/50 rounded-2xl py-5 pl-16 pr-6 font-bold focus:outline-none focus:border-primary/30 transition-all text-lg"
                                />
                            </div>

                            {/* Commands Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredCommands.map((cmd, idx) => {
                                    const cmdId = `${activeCategory}-${idx}`;
                                    return (
                                        <div
                                            key={cmdId}
                                            className="bg-white p-8 rounded-[2rem] border border-border/40 hover:border-primary/20 transition-all duration-300 group shadow-sm hover:shadow-xl"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-2xl font-black text-foreground">/{cmd.name}</h3>
                                                    {cmd.aliases.length > 0 && (
                                                        <div className="flex gap-1">
                                                            {cmd.aliases.map(a => (
                                                                <span key={a} className="text-xs font-bold px-2 py-1 rounded-md bg-zinc-100 text-muted-foreground">
                                                                    {a}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(cmd.example, cmdId)}
                                                    className="p-3 rounded-xl bg-zinc-50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                                                >
                                                    {copiedIndex === cmdId ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                            </div>

                                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                                {cmd.description}
                                            </p>

                                            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">Example Command</span>
                                                </div>
                                                <code className="text-primary font-black text-sm">{cmd.example}</code>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {filteredCommands.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-border">
                                    <div className="inline-flex p-4 rounded-full bg-zinc-100 text-muted-foreground mb-4">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold">No commands found</h3>
                                    <p className="text-muted-foreground">Try searching for something else or check another category.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
