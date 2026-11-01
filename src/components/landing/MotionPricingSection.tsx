"use client";

const MOTION_STYLES = [
  { name: "Apple Launch", emoji: "🍎", gradient: "linear-gradient(135deg, #1a1a2e, #16213e)", textColor: "white" },
  { name: "Startup Launch", emoji: "🚀", gradient: "linear-gradient(135deg, #667eea, #764ba2)", textColor: "white" },
  { name: "Luxury Brand", emoji: "💎", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", textColor: "white" },
  { name: "Google Style", emoji: "🎨", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", textColor: "white" },
  { name: "Viral Ad", emoji: "🔥", gradient: "linear-gradient(135deg, #f7971e, #ffd200)", textColor: "white" },
];

const PRICING = [
  { plan: "Free", price: "0", color: "#9CA3AF", features: ["3 generations/day", "720p exports", "Standard templates"] },
  { plan: "Pro", price: "29", color: "#9F7AEA", features: ["Unlimited generations", "1080p exports", "Priority support", "Premium templates", "No watermark"], highlight: true },
  { plan: "Enterprise", price: "Custom", color: "#374151", features: ["Team collaboration", "Brand kits", "Priority support", "Advanced analytics"] },
];

export default function MotionPricingSection() {
  return (
    <>
      {/* Motion Styles */}
      <section className="py-24 px-4" style={{ background: "rgba(250,250,252,0.5)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9F7AEA" }}>✦ CHOOSE YOUR MOTION STYLE</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>
                Stunning motion styles for{" "}
                <span className="gradient-text-blue">every brand</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
                Choose the perfect visual style that matches your brand and message.
              </p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {MOTION_STYLES.map((style) => (
                <div key={style.name} className="flex-shrink-0 rounded-2xl overflow-hidden card-hover cursor-pointer" style={{ width: "120px" }}>
                  <div className="h-24 flex items-center justify-center text-3xl" style={{ background: style.gradient }}>
                    {style.emoji}
                  </div>
                  <div className="p-2 text-center" style={{ background: "rgba(255,255,255,0.9)" }}>
                    <p className="text-xs font-semibold" style={{ color: "#374151" }}>{style.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9F7AEA" }}>✦ PRICING</p>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>Simple, transparent pricing</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-sm" style={{ color: "#6B7280" }}>Monthly</span>
              <div className="w-12 h-6 rounded-full relative cursor-pointer" style={{ background: "#9F7AEA" }}>
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
              </div>
              <span className="text-sm font-medium" style={{ color: "#9F7AEA" }}>Yearly <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(159,122,234,0.1)" }}>Save 25%</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((tier) => (
              <div key={tier.plan} className="rounded-2xl p-6 relative card-hover"
                style={{
                  background: tier.highlight ? "linear-gradient(135deg, #9F7AEA, #B794F6)" : "rgba(255,255,255,0.9)",
                  border: tier.highlight ? "none" : "1px solid rgba(232,232,239,0.6)",
                  boxShadow: tier.highlight ? "0 20px 60px rgba(159,122,234,0.3)" : "0 4px 20px rgba(0,0,0,0.04)"
                }}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-white"
                    style={{ color: "#9F7AEA" }}>Most Popular</div>
                )}
                <p className="text-sm font-semibold mb-1" style={{ color: tier.highlight ? "rgba(255,255,255,0.8)" : "#9CA3AF" }}>{tier.plan}</p>
                <div className="flex items-end gap-1 mb-4">
                  {tier.price !== "Custom" ? (
                    <>
                      <span className="text-4xl font-bold" style={{ color: tier.highlight ? "white" : "#0F0F14" }}>${tier.price}</span>
                      <span className="text-sm mb-1" style={{ color: tier.highlight ? "rgba(255,255,255,0.7)" : "#9CA3AF" }}>/month</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold" style={{ color: "#0F0F14" }}>Custom</span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm"
                      style={{ color: tier.highlight ? "rgba(255,255,255,0.85)" : "#6B7280" }}>
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: tier.highlight ? "white" : tier.plan === "Free" ? "rgba(0,0,0,0.06)" : "rgba(159,122,234,0.1)",
                    color: tier.highlight ? "#9F7AEA" : tier.plan === "Free" ? "#374151" : "#9F7AEA"
                  }}>
                  {tier.plan === "Free" ? "Get Started" : tier.plan === "Pro" ? "Start Free Trial" : "Contact Sales"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
