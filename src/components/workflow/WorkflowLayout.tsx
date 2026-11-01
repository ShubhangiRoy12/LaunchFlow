"use client";

import Link from "next/link";
import { Bell, Command, Sparkles, UserRound } from "lucide-react";

export default function WorkflowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden" style={{ background: "#F7F7FB" }}>
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3"
        style={{
          background: "rgba(247,247,251,0.82)",
          borderBottom: "1px solid rgba(221,225,235,0.72)",
          backdropFilter: "blur(24px)",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <img src="/launchflow-logo.png" alt="LaunchFlow" width={120} height={68} style={{ width: 120, height: 68, objectFit: "cover", mixBlendMode: "multiply" }} />
        </Link>

        <div className="hidden md:flex items-center gap-2 rounded-2xl px-3 py-2 w-[420px]" style={{ background: "white", border: "1px solid rgba(221,225,235,0.82)" }}>
          <Command size={15} style={{ color: "#7C3AED" }} />
          <span className="text-sm" style={{ color: "#8A94A6" }}>Ask LaunchFlow to create, revise, render or export...</span>
          <span className="ml-auto text-xs px-2 py-1 rounded-lg" style={{ color: "#8A94A6", background: "#F3F4F8" }}>⌘ K</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "white", border: "1px solid rgba(221,225,235,0.82)" }}>
            <Bell size={16} style={{ color: "#5B6472" }} />
          </button>
          <button className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#111827" }}>
            <UserRound size={16} color="white" />
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
