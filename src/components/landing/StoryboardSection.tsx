"use client";

const SCENES = [
  { id: "01", label: "Hook", color: "#9F7AEA", desc: "Grab attention in the first 3 seconds" },
  { id: "02", label: "Problem", color: "#7DD3FC", desc: "Show the pain clearly" },
  { id: "03", label: "Reveal", color: "#B794F6", desc: "Introduce your product" },
  { id: "04", label: "Features", color: "#F9A8D4", desc: "Show key new features" },
  { id: "05", label: "Benefits", color: "#FDBA74", desc: "Highlight key benefits" },
  { id: "06", label: "CTA", color: "#6EE7B7", desc: "Call to action & next steps" },
];

export default function StoryboardSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left text */}
          <div className="md:sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9F7AEA" }}>✦ AI STORYBOARD PREVIEW</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>
              Storyboards that tell your{" "}
              <span className="gradient-text">story perfectly</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              AI creates a proven storytelling structure that helps your audience and drives action.
            </p>
            <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#9F7AEA" }}>
              View Full Storyboard →
            </button>
          </div>

          {/* Right: Scene cards */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {SCENES.map((scene) => (
              <div key={scene.id} className="flex-shrink-0 flex flex-col items-center gap-2" style={{ width: "90px" }}>
                {/* Scene number */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
                    style={{ background: scene.color }}>
                    {scene.id}
                  </div>
                </div>
                <p className="text-xs font-semibold text-center" style={{ color: "#374151" }}>{scene.label}</p>
                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>{scene.desc}</p>
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${scene.color}15`, border: `1px solid ${scene.color}30` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: scene.color }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                      <path d="M3 2L8 5L3 8V2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
