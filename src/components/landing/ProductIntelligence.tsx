"use client";

const ANALYSIS_ITEMS = [
  { label: "Product", value: "LaunchFlow AI" },
  { label: "Category", value: "AI Marketing Platform" },
  { label: "Audience", value: "Founders, Startups, Marketing Teams" },
  { label: "Launch Goal", value: "User Acquisition" },
  { label: "Brand Tone", value: "Modern, Confident, Innovative" },
  { label: "Best Platform", value: "LinkedIn, YouTube, Product Hunt" },
];

export default function ProductIntelligenceSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#9F7AEA" }}>✦ AI PRODUCT INTELLIGENCE</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>
              AI that truly understands{" "}
              <span className="gradient-text">your product</span>
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "#6B7280" }}>
              Our AI goes deep to understand your product, competitors and positioning to create the perfect launch strategy.
            </p>
            <ul className="space-y-3">
              {["Product & market analysis", "Audience identification", "Competitor insights", "Brand & visual analysis", "Launch strategy recommendations"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#374151" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #9F7AEA, #B794F6)" }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: mock analysis card */}
          <div className="relative">
            {/* Browser mockup */}
            <div className="rounded-2xl overflow-hidden mb-4"
              style={{ boxShadow: "0 20px 60px rgba(159,122,234,0.15)", border: "1px solid rgba(232,232,239,0.6)" }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#F4F4F6" }}>
                <div className="flex gap-1.5">
                  {["#F87171","#FBBF24","#34D399"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                </div>
                <div className="flex-1 mx-3 px-3 py-1 rounded-lg text-xs" style={{ background: "white", color: "#9CA3AF" }}>launchflow.ai</div>
              </div>
              <div className="p-6 text-center"
                style={{ background: "linear-gradient(135deg, #9F7AEA 0%, #B794F6 50%, #F9A8D4 100%)" }}>
                <p className="text-white text-lg font-bold mb-1">The AI Creative Director</p>
                <p className="text-white/80 text-sm mb-4">for Product Launches</p>
                <p className="text-white/70 text-xs">Turn your ideas into stunning launch videos, campaigns and content with AI.</p>
                <div className="flex gap-2 justify-center mt-4">
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: "white", color: "#9F7AEA" }}>Get Started</button>
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold border border-white/40 text-white">Watch Demo</button>
                </div>
              </div>
            </div>

            {/* Analysis card */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(232,232,239,0.8)", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#0F0F14" }}>Product Analysis</p>
              <div className="space-y-3">
                {ANALYSIS_ITEMS.map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-xs" style={{ color: "#9CA3AF", minWidth: "90px" }}>{label}</span>
                    <span className="text-xs font-medium text-right" style={{ color: "#374151" }}>{value}</span>
                  </div>
                ))}
              </div>
              {/* Color swatches */}
              <div className="flex gap-2 mt-4">
                {["#9F7AEA","#7DD3FC","#F9A8D4","#FDBA74"].map(c => (
                  <div key={c} className="w-6 h-6 rounded-lg" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
