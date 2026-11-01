"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: "rgba(250,250,252,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(232,232,239,0.6)" }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #9F7AEA, #B794F6)" }}>
          <Sparkles size={16} color="white" />
        </div>
        <span className="font-semibold text-base" style={{ color: "#0F0F14" }}>
          LaunchFlow <span className="gradient-text">AI</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {["Templates", "Gallery", "Pricing", "Resources"].map((item) => (
          <Link key={item} href="#" className="text-sm font-medium flex items-center gap-1"
            style={{ color: "#6B7280" }}>
            {item}
            {item === "Resources" && <ChevronDown size={14} />}
          </Link>
        ))}
        <span className="w-px h-5" style={{ background: "#E8E8EF" }} />
        <Link href="#" className="text-sm font-medium" style={{ color: "#6B7280" }}>Sign in</Link>
        <Link href="/workflow" className="btn-generate text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2">
          <Sparkles size={14} />
          Get Started
        </Link>
      </div>

      {/* Avatar */}
      <div className="hidden md:flex items-center gap-2 ml-4">
        <div className="w-9 h-9 rounded-full overflow-hidden" style={{ background: "linear-gradient(135deg, #9F7AEA, #F9A8D4)" }}>
          <div className="w-full h-full flex items-center justify-center text-white text-sm font-semibold">A</div>
        </div>
        <ChevronDown size={14} style={{ color: "#9CA3AF" }} />
      </div>

      {/* Mobile toggle */}
      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 glass border-t p-6 flex flex-col gap-4 md:hidden">
          {["Templates", "Gallery", "Pricing", "Resources"].map((item) => (
            <Link key={item} href="#" className="text-sm font-medium" style={{ color: "#6B7280" }}>{item}</Link>
          ))}
          <Link href="/workflow" className="btn-generate text-white text-sm font-semibold px-5 py-3 rounded-xl text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
