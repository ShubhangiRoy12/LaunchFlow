"use client";

export default function CreativeDirectorSection() {
  return (
    <section className="py-24 px-4" style={{ background: "rgba(250,250,252,0.5)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Creative Director card */}
          <div className="rounded-2xl p-6" style={{
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(232,232,239,0.6)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.05)"
          }}>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Pill label="Recommended style:" value="Startup Launch" />
              <Pill label="Emotional Tone:" value="Excited, Confident, Inspiring" />
              <Pill label="Recommended duration:" value="30 seconds" />
              <Pill label="Best platforms:" value="LinkedIn, YouTube, Product Hunt" />
            </div>

            {/* Center icon */}
            <div className="flex justify-center my-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg, #9F7AEA, #B794F6)", boxShadow: "0 8px 25px rgba(159,122,234,0.4)" }}>
                🎬
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 p-3 rounded-xl" style={{ background: "rgba(159,122,234,0.06)", border: "1px solid rgba(159,122,234,0.12)" }}>
                <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Hook idea:</p>
                <p className="text-sm font-medium" style={{ color: "#374151" }}>"Launch your product faster than ever before."</p>
              </div>
              <div className="col-span-2 flex items-center justify-between p-3 rounded-xl cursor-pointer card-hover"
                style={{ background: "rgba(159,122,234,0.06)", border: "1px solid rgba(159,122,234,0.12)" }}>
                <span className="text-sm font-medium" style={{ color: "#9F7AEA" }}>Generate your storyboard →</span>
              </div>
            </div>
          </div>

          {/* Right text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9F7AEA" }}>✦ AI CREATIVE DIRECTOR</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>
              Your personal AI{" "}
              <span className="gradient-text-blue">Creative Director</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
              Get expert recommendations powered by AI to make your launch more impactful, engaging and successful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(232,232,239,0.8)" }}>
      <p className="text-xs mb-0.5" style={{ color: "#9CA3AF" }}>{label}</p>
      <p className="text-sm font-semibold" style={{ color: "#374151" }}>{value}</p>
    </div>
  );
}
