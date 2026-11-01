"use client";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(159,122,234,0.08) 0%, rgba(249,168,212,0.08) 100%)", border: "1px solid rgba(159,122,234,0.15)" }}>
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #FDBA74 0%, transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #7DD3FC 0%, transparent 70%)", filter: "blur(40px)" }} />
            
            <h2 className="text-3xl font-bold mb-3 relative" style={{ color: "#0F0F14", letterSpacing: "-0.02em" }}>
              Ready to launch something <span className="gradient-text">amazing?</span>
            </h2>
            <p className="text-base mb-8 relative" style={{ color: "#6B7280" }}>
              Join thousands of founders who trust LaunchFlow AI for their product launches.
            </p>
            
            <div className="flex items-center gap-3 max-w-md mx-auto relative">
              <input placeholder="Describe your product or idea..."
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none input-focus"
                style={{ background: "white", border: "1px solid rgba(232,232,239,0.8)", color: "#374151" }} />
              <Link href="/workflow" className="btn-generate flex items-center gap-2 text-white font-semibold px-5 py-3 rounded-xl text-sm whitespace-nowrap">
                <Sparkles size={14} />
                Generate Launch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t" style={{ borderColor: "rgba(232,232,239,0.6)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #9F7AEA, #B794F6)" }}>
                  <Sparkles size={13} color="white" />
                </div>
                <span className="font-semibold text-sm">LaunchFlow <span className="gradient-text">AI</span></span>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
                The AI Creative Director for Product Launches
              </p>
              <div className="flex gap-3">
                {["𝕏", "in", "▶", "📷"].map((icon, i) => (
                  <a key={i} href="#" className="text-sm" style={{ color: "#9CA3AF" }}>{icon}</a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Product", items: ["Templates", "Gallery", "Pricing", "Changelog"] },
              { title: "Resources", items: ["Blog", "Docs", "Help Center", "Status"] },
              { title: "Company", items: ["About", "Careers", "Contact", "Privacy"] },
              { title: "Legal", items: ["Terms of Service", "Privacy Policy", "Refund Policy"] },
            ].map(({ title, items }) => (
              <div key={title}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#374151" }}>{title}</p>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: "#9CA3AF" }}>{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: "rgba(232,232,239,0.6)" }}>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>© 2026 LaunchFlow AI. All rights reserved.</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Made with ❤️ for founders</p>
          </div>
        </div>
      </footer>
    </>
  );
}
