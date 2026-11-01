"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Globe, Figma, Upload, ChevronDown, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { label: "SaaS Platform", icon: "⬡" },
  { label: "Mobile App", icon: "📱" },
  { label: "E-commerce", icon: "🛒" },
  { label: "AI Product", icon: "🤖" },
  { label: "Physical Product", icon: "📦" },
  { label: "More", icon: "···" },
];

const TEMPLATES = [
  { name: "SaaS Launch", color: "#9F7AEA", bg: "rgba(159,122,234,0.08)" },
  { name: "Mobile App", color: "#7DD3FC", bg: "rgba(125,211,252,0.08)" },
  { name: "AI Product", color: "#B794F6", bg: "rgba(183,148,246,0.08)" },
  { name: "Consumer Product", color: "#F9A8D4", bg: "rgba(249,168,212,0.08)" },
  { name: "Fashion Brand", color: "#FDBA74", bg: "rgba(253,186,116,0.08)" },
  { name: "Real Estate", color: "#6EE7B7", bg: "rgba(110,231,183,0.08)" },
  { name: "Education Platform", color: "#93C5FD", bg: "rgba(147,197,253,0.08)" },
  { name: "Gaming Product", color: "#F87171", bg: "rgba(248,113,113,0.08)" },
];

export default function Hero() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = () => {
    if (input.trim()) router.push("/workflow");
    else router.push("/workflow");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #B794F6 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="blob blob-delay-2 absolute top-1/4 -right-20 w-80 h-80 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #F9A8D4 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="blob blob-delay-4 absolute bottom-20 left-1/3 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FDBA74 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="blob absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #7DD3FC 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      {/* Badge */}
      <div className="relative flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        style={{ background: "rgba(159,122,234,0.08)", border: "1px solid rgba(159,122,234,0.2)" }}>
        <Sparkles size={13} style={{ color: "#9F7AEA" }} />
        <span className="text-sm font-medium" style={{ color: "#9F7AEA" }}>AI Creative Studio for Launch Videos</span>
      </div>

      {/* Headline */}
      <h1 className="relative text-center font-bold mb-6 max-w-3xl leading-tight"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#0F0F14", letterSpacing: "-0.02em" }}>
        What would you like to{" "}
        <span className="gradient-text">launch</span>{" "}today?
      </h1>

      {/* Subheading */}
      <p className="relative text-center mb-10 max-w-xl leading-relaxed"
        style={{ fontSize: "1.0625rem", color: "#6B7280" }}>
        Turn websites, products and ideas into stunning launch videos in minutes.
      </p>

      {/* Main Input Card */}
      <div className="relative w-full max-w-2xl mb-6">
        <div className="rounded-2xl p-5" style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(232,232,239,0.8)",
          boxShadow: "0 8px 40px rgba(159,122,234,0.1), 0 2px 12px rgba(0,0,0,0.04)"
        }}>
          {/* Text input */}
          <div className="flex items-start gap-3 mb-5">
            <Sparkles size={18} style={{ color: "#B794F6", marginTop: "2px", flexShrink: 0 }} />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your product, website or idea..."
              rows={2}
              className="w-full resize-none bg-transparent text-base outline-none"
              style={{ color: "#0F0F14", lineHeight: 1.6 }}
            />
          </div>

          {/* Action buttons row */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { icon: Globe, label: "Website URL" },
              { icon: Figma, label: "Figma Design" },
              { icon: Upload, label: "Upload Assets" },
            ].map(({ icon: Icon, label }) => (
              <button key={label}
                onClick={() => setActiveTab(activeTab === label ? null : label)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === label ? "rgba(159,122,234,0.1)" : "rgba(0,0,0,0.04)",
                  color: activeTab === label ? "#9F7AEA" : "#6B7280",
                  border: activeTab === label ? "1px solid rgba(159,122,234,0.3)" : "1px solid transparent"
                }}>
                <Icon size={15} />
                {label}
              </button>
            ))}

            <div className="flex-1" />

            <button onClick={handleGenerate} className="btn-generate flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
              <Sparkles size={15} />
              Generate Launch
            </button>
          </div>
        </div>
      </div>

      {/* Try a sample */}
      <button className="relative flex items-center gap-1.5 text-sm mb-8" style={{ color: "#9CA3AF" }}>
        Try a sample
        <ChevronDown size={14} />
      </button>

      {/* Category pills */}
      <div className="relative flex items-center gap-2 flex-wrap justify-center mb-16">
        {CATEGORIES.map(({ label }) => (
          <button key={label}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 card-hover"
            style={{
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(232,232,239,0.8)",
              color: "#6B7280",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Trusted by */}
      <p className="relative text-xs mb-6 text-center" style={{ color: "#9CA3AF" }}>
        Trusted by creators at
      </p>

      {/* HOW IT WORKS section */}
      <HowItWorks />

      {/* Templates grid */}
      <TemplatesSection />
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "⬡", title: "Input Your Idea", desc: "Add your website, product or upload assets" },
    { icon: "🤖", title: "AI Understands", desc: "Our AI analyzes your product, audience and market" },
    { icon: "🎬", title: "Creative Strategy", desc: "AI creates a custom launch strategy and storyboard" },
    { icon: "✨", title: "Motion Design", desc: "Stunning visuals, voiceover and animations" },
    { icon: "🚀", title: "Launch Everywhere", desc: "Export videos & assets for every platform" },
  ];

  return (
    <div className="w-full max-w-5xl mt-12 mb-20 px-4">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9F7AEA" }}>✦ HOW IT WORKS</p>
        <h2 className="text-3xl font-bold" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>From idea to launch in minutes</h2>
      </div>
      <div className="flex items-start justify-between gap-4 flex-wrap md:flex-nowrap">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center flex-1 min-w-[140px]">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 text-2xl"
              style={{ background: "rgba(159,122,234,0.08)", border: "1px solid rgba(159,122,234,0.15)" }}>
              {step.icon}
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute" style={{ width: "calc(20% - 3.5rem)", height: "2px", marginTop: "1.75rem" }} />
            )}
            <p className="text-sm font-semibold mb-1" style={{ color: "#0F0F14" }}>{step.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplatesSection() {
  return (
    <div className="w-full max-w-5xl px-4 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>Launch templates</h2>
        <p className="text-sm mt-2" style={{ color: "#9CA3AF" }}>Start from a proven template or create from scratch</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEMPLATES.map((t) => (
          <button key={t.name}
            className="card-hover rounded-2xl p-5 text-left"
            style={{ background: t.bg, border: `1px solid ${t.color}22` }}>
            <div className="w-9 h-9 rounded-xl mb-3" style={{ background: `${t.color}22` }}>
              <div className="w-full h-full rounded-xl" style={{ background: t.color, opacity: 0.4 }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: "#0F0F14" }}>{t.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
