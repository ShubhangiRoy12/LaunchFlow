"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Figma, Globe, Sparkles, Upload } from "lucide-react";
import LaunchShowcase from "@/components/LaunchShowcase";
import PromptSuggestion from "@/components/PromptSuggestion";
import "@/components/launch-background.css";

const samples = ["AI Notes App", "SaaS Dashboard", "E-commerce Store", "Web3 Platform", "Fitness App"];

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showUrl, setShowUrl] = useState(false);

  const start = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("launchflow.homePrompt", prompt);
      localStorage.setItem("launchflow.homeWebsite", websiteUrl);
    }
    router.push("/workflow");
  };

  return (
    <main style={styles.page}>
      <div className="lf-cinema-background" aria-hidden="true"><div className="lf-film"><i /><i /><i /></div><div className="lf-film lf-film-right"><i /><i /><i /></div><div className="lf-frame-corner" /><div className="lf-frame-corner" /></div>
      <style>{`main textarea,main input{box-sizing:border-box} @media(max-width:700px){main h1{font-size:40px!important;letter-spacing:0!important}main header{padding:18px!important}main header button{padding:10px!important}main section>div{max-width:100%;box-sizing:border-box}}`}</style>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src="/launchflow-logo-transparent.png" alt="LaunchFlow" width={120} height={60} style={{ width: 120, height: 60, objectFit: "contain" }} />
        </div>
        <div style={styles.headerRight}>
          <button onClick={() => document.getElementById("examples")?.scrollIntoView({ behavior: "smooth" })} style={styles.templateBtn}><Sparkles size={16} /> Explore examples</button>
          <div style={styles.avatar}>D</div>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.badge}><Sparkles size={15} /> AI-Powered Launch Video Studio</div>
        <h1 style={styles.title}>What would you like<br />to <span style={styles.gradientText}>launch</span> today?</h1>
        <p style={styles.subtitle}>Turn your ideas, websites, and designs into<br />stunning launch videos in minutes.</p>

        <div style={styles.inputCard}>
          <div style={styles.promptRow}>
            <Sparkles size={22} color="#8B5CF6" />
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe your product or launch idea..."
              rows={3}
              style={styles.textarea}
            />
          </div>
          <PromptSuggestion prompt={prompt} onApply={setPrompt} />
          {showUrl && (
            <input
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
              placeholder="https://your-website.com"
              style={styles.urlInput}
            />
          )}
          <div style={styles.actions}>
            <button onClick={() => setShowUrl(!showUrl)} style={styles.pill}><Globe size={20} /> Website URL</button>
            <button style={styles.pill}><Figma size={20} /> Figma Design</button>
            <button style={styles.pill}><Upload size={20} /> Upload Assets</button>
            <button onClick={start} style={styles.generate}>Generate Launch <Sparkles size={18} /></button>
          </div>
        </div>

        <div style={styles.try}>Try a sample</div>
        <div style={styles.samples}>
          {samples.map((sample) => (
            <button key={sample} onClick={() => setPrompt(`${sample} launch video`)} style={styles.sample}>{sample}</button>
          ))}
        </div>
      </section>
      <LaunchShowcase onSelect={setPrompt} />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", position: "relative", overflow: "hidden", background: "linear-gradient(115deg,#eee9ff 0%,#fafbff 32%,#fafbff 64%,#fce9f0 100%)", fontFamily: "DM Sans, Inter, Arial, sans-serif", color: "#111827" },
  bgLeft: { position: "absolute", left: -70, top: 110, width: 350, height: 520, borderRadius: "45%", background: "radial-gradient(circle, rgba(139,92,246,.22), rgba(96,165,250,.08) 48%, transparent 70%)", filter: "blur(8px)" },
  bgRight: { position: "absolute", right: -90, top: 160, width: 390, height: 520, borderRadius: "45%", background: "radial-gradient(circle, rgba(251,113,133,.24), rgba(251,191,36,.10) 48%, transparent 72%)", filter: "blur(7px)" },
  header: { position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 34px" },
  brand: { display: "flex", alignItems: "center", gap: 14 },
  logo: { width: 38, height: 38, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#6366F1,#F472B6)" },
  brandName: { fontSize: 18, fontWeight: 800 },
  brandSub: { fontSize: 13, color: "#8A94B8", marginTop: 3 },
  gradientText: { background: "linear-gradient(135deg,#6366F1,#A855F7,#FB7185)", WebkitBackgroundClip: "text", color: "transparent" },
  headerRight: { display: "flex", alignItems: "center", gap: 18 },
  templateBtn: { display: "flex", alignItems: "center", gap: 10, border: "1px solid #E7E8F3", background: "rgba(255,255,255,.78)", borderRadius: 22, padding: "13px 24px", fontWeight: 800, color: "#312E81", boxShadow: "0 12px 30px rgba(99,102,241,.08)" },
  avatar: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#111827,#60A5FA)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 },
  hero: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 20px 48px" },
  badge: { display: "flex", alignItems: "center", gap: 9, border: "1px solid #DDD6FE", background: "rgba(255,255,255,.72)", color: "#6D5DFB", borderRadius: 16, padding: "10px 18px", fontSize: 14, fontWeight: 800, marginBottom: 24 },
  title: { margin: 0, fontSize: "clamp(44px, 5vw, 72px)", lineHeight: 1.08, letterSpacing: "-0.045em", fontWeight: 900 },
  subtitle: { margin: "24px 0 34px", fontSize: 19, lineHeight: 1.65, color: "#7B86AA", fontWeight: 600 },
  inputCard: { width: "min(980px, 92vw)", textAlign: "left", background: "rgba(255,255,255,.88)", border: "1px solid rgba(224,226,241,.95)", borderRadius: 26, padding: 28, boxShadow: "0 28px 80px rgba(99,102,241,.12)" },
  promptRow: { display: "flex", gap: 16, alignItems: "flex-start" },
  textarea: { flex: 1, minHeight: 74, border: "none", outline: "none", resize: "none", background: "transparent", color: "#111827", fontSize: 18, lineHeight: 1.6, fontFamily: "inherit" },
  urlInput: { width: "100%", marginTop: 14, border: "1px solid #E4E7F4", borderRadius: 16, padding: "14px 16px", fontSize: 15, outline: "none" },
  actions: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 20 },
  pill: { display: "flex", alignItems: "center", gap: 10, border: "1px solid #E3E6F2", background: "white", color: "#1F2A44", borderRadius: 14, padding: "15px 24px", fontWeight: 800, fontSize: 15 },
  generate: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, border: "none", color: "white", borderRadius: 14, padding: "17px 30px", fontWeight: 900, fontSize: 16, background: "linear-gradient(135deg,#6366F1,#A855F7,#FB7185)", boxShadow: "0 16px 36px rgba(168,85,247,.28)" },
  try: { marginTop: 32, color: "#9AA3BF", fontSize: 13, fontWeight: 700 },
  samples: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginTop: 24 },
  sample: { border: "1px solid #E7E0FF", background: "rgba(255,255,255,.72)", color: "#5E6686", borderRadius: 22, padding: "12px 22px", fontWeight: 800 },
};
