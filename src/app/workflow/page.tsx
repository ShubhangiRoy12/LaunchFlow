"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Brain, Clapperboard, Globe, Loader2, Monitor, Palette, Play, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import PromptSuggestion from "@/components/PromptSuggestion";
import { suggestLaunchPrompt } from "@/lib/promptDirection";

type ProjectResult = {
  productName: string;
  tagline: string;
  audience: string;
  features: string[];
  storyboard: string[];
  website?: {
    title: string;
    description: string;
    headings: string[];
    content: string;
    colors: string[];
    screenshot: string;
  };
  remotionProps: Record<string, unknown>;
};

type VideoResult = {
  id: string;
  state: string;
  model?: string;
  localVideoUrl?: string;
  remoteVideoUrl?: string;
};

const stages = [
  { label: "Reading your brief", icon: Brain },
  { label: "Setting the visual direction", icon: Palette },
  { label: "Preparing the scene prompt", icon: Clapperboard },
  { label: "Generating with Veo", icon: Play },
  { label: "Preview and download", icon: Monitor },
];

export default function WorkflowPage() {
  const [prompt, setPrompt] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [productType, setProductType] = useState("Physical product");
  const [mood, setMood] = useState("Cinematic and premium");
  const [loading, setLoading] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProjectResult | null>(null);
  const [video, setVideo] = useState<VideoResult | null>(null);

  useEffect(() => {
    setPrompt(localStorage.getItem("launchflow.homePrompt") || "");
    setWebsiteUrl(localStorage.getItem("launchflow.homeWebsite") || "");
  }, []);

  const generate = async () => {
    if (!prompt.trim()) {
      setError("Please describe what you want to launch.");
      return;
    }
    setError("");
    setResult(null);
    setVideo(null);
    setLoading(true);
    setActiveStage(0);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const creativeBrief = { prompt: prompt.trim(), category: productType, mood };
      setActiveStage(1);
      await new Promise(resolve => setTimeout(resolve, 500));
      const scenePrompt = `${creativeBrief.prompt}. Product category: ${creativeBrief.category}. Creative direction: ${creativeBrief.mood}. Maintain consistent product appearance, deliberate camera movement and a polished final reveal.`;
      setActiveStage(2);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveStage(3);
      const response = await fetch("/api/generate-veo-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: scenePrompt,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");
      setVideo(data);
      setActiveStage(5);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Generation failed.";
      setError(/401|UNAUTHENTICATED|API key|GEMINI_API_KEY|\.env.local/i.test(message) ? "Video generation is temporarily unavailable. Please explore the sample videos or try again later." : /429|RESOURCE_EXHAUSTED/i.test(message) ? "The video provider's generation limit has been reached. Please try again later or explore the sample videos." : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <style>{`main input,main textarea,main select{box-sizing:border-box;min-width:0} main select{margin-top:8px}main h1,main h2{letter-spacing:0!important}@media(max-width:760px){main section{grid-template-columns:minmax(0,1fr)!important;width:94%!important}main h1{font-size:30px!important}main header{padding:18px!important}main section>div{min-width:0}main section>div:first-child{padding:20px!important}}`}</style>
      <div style={styles.bg} />
      <header style={styles.header}>
        <Link href="/" style={styles.back}><ArrowLeft size={18} /> Back</Link>
        <div style={styles.brand}><Sparkles size={18} /> LaunchFlow AI Studio</div>
      </header>

      <section style={styles.shell}>
        <div style={styles.left}>
          <div style={styles.kicker}><Sparkles size={15} /> AI launch command</div>
          <h1 style={styles.title}>Describe the launch.<br />AI builds the video system.</h1>
          <p style={styles.copy}>Give your product a memorable entrance. Describe the reveal, choose your direction, and generate a video with Veo.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}>
            <label style={styles.label}>Product type<select style={styles.input} value={productType} onChange={event => setProductType(event.target.value)}>{["Physical product", "Website or SaaS", "Mobile app", "Brand campaign", "Service"].map(item => <option key={item}>{item}</option>)}</select></label>
            <label style={styles.label}>Creative direction<select style={styles.input} value={mood} onChange={event => setMood(event.target.value)}>{["Cinematic and premium", "Playful and energetic", "Minimal and elegant", "Warm and emotional"].map(item => <option key={item}>{item}</option>)}</select></label>
          </div>

          <label style={styles.label}>Launch prompt</label>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={7} style={styles.textarea} placeholder="LaunchFlow AI is an AI Creative Director that creates launch videos from websites and apps." />
          <PromptSuggestion prompt={prompt} mood={mood} onApply={setPrompt} />

          <label style={styles.label}>Website URL</label>
          <input value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} style={styles.input} placeholder="https://stripe.com" />

          {error && <div style={styles.error}>{error}</div>}
          {error && <Link href="/#examples" style={{ display: "inline-block", marginTop: 12, color: "#7950bd", fontWeight: 700 }}>Explore sample videos</Link>}
          <button onClick={generate} disabled={loading} style={styles.generate}>
            {loading ? <Loader2 size={19} /> : <Send size={19} />}
            {loading ? "Generating..." : "Generate Launch"}
          </button>
        </div>

        <div style={styles.right}>
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div>
              <div style={styles.panelKicker}>Your launch preview</div>
              <h2 style={styles.panelTitle}>{loading ? "Generating Veo video..." : video ? "Veo video ready" : "Waiting for input"}</h2>
              </div>
              <div style={styles.status}>{loading ? "Running" : video ? "Ready" : error ? "Needs attention" : "Idle"}</div>
            </div>

            <div style={styles.stageList}>
              {stages.map(({ label, icon: Icon }, index) => {
                const done = !!video || index < activeStage;
                const active = loading && index === activeStage;
                return (
                  <div key={label} style={{ ...styles.stage, borderColor: active ? "#A855F7" : done ? "#C4B5FD" : "#E7EAF5", background: active ? "#FAF5FF" : done ? "#F6F3FF" : "#FFFFFF" }}>
                    <div style={{ ...styles.stageIcon, background: done || active ? "linear-gradient(135deg,#6366F1,#A855F7)" : "#EEF0F8" }}>
                      {active ? <Loader2 size={17} color="white" /> : done ? <BadgeCheck size={17} color="white" /> : <Icon size={17} color="#8A94B8" />}
                    </div>
                    <div>
                      <div style={styles.stageLabel}>{label}</div>
                      <div style={styles.stageSub}>{error && index === activeStage ? "Stopped - check the message on the left" : active ? index === 3 ? "Waiting for provider output" : "Preparing" : done ? "Complete" : "Queued"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {prompt.trim() && <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #e9e5f2" }}><div style={styles.panelKicker}>Creative brief</div><p style={{ fontSize: 14, lineHeight: 1.8, color: "#667085" }}>{suggestLaunchPrompt(prompt, mood)}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "#8562b9", fontSize: 12 }}><span>{productType}</span><span>/</span><span>{mood}</span></div></div>}
          </div>

          {video?.localVideoUrl && (
            <div style={styles.resultGrid}>
              <div style={{ ...styles.resultCard, gridColumn: "1 / -1" }}>
                <div style={styles.resultTitle}>Generated Veo Video</div>
                <video src={video.localVideoUrl} controls style={{ width: "100%", borderRadius: 18, marginTop: 12 }} />
                <div style={styles.resultSub}>{video.localVideoUrl}</div>
              </div>
            </div>
          )}

          {result && (
            <div style={styles.resultGrid}>
              <ResultCard title="Product" value={result.productName} sub={result.tagline} />
              <ResultCard title="Audience" value={result.audience} />
              <ResultCard title="Features" value={result.features.join(" · ")} />
              <ResultCard title="Storyboard" value={result.storyboard.join(" → ")} />
              {result.website?.screenshot && <img src={result.website.screenshot} alt="Website screenshot" style={styles.screenshot} />}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ResultCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={styles.resultCard}>
      <div style={styles.resultTitle}>{title}</div>
      <div style={styles.resultValue}>{value}</div>
      {sub && <div style={styles.resultSub}>{sub}</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", position: "relative", overflow: "hidden", background: "#FAFBFF", fontFamily: "DM Sans, Inter, Arial, sans-serif", color: "#111827" },
  bg: { position: "absolute", inset: 0, background: "radial-gradient(circle at 9% 20%, rgba(139,92,246,.16), transparent 27%), radial-gradient(circle at 90% 24%, rgba(251,113,133,.18), transparent 28%)" },
  header: { position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 34px" },
  back: { display: "flex", alignItems: "center", gap: 8, color: "#5D6685", textDecoration: "none", fontWeight: 800 },
  brand: { display: "flex", alignItems: "center", gap: 9, color: "#6D5DFB", fontWeight: 900 },
  shell: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "minmax(360px, 480px) 1fr", gap: 28, width: "min(1280px, 94vw)", margin: "20px auto", alignItems: "start" },
  left: { background: "rgba(255,255,255,.9)", border: "1px solid #E5E8F5", borderRadius: 28, padding: 30, boxShadow: "0 26px 70px rgba(99,102,241,.10)" },
  kicker: { display: "flex", alignItems: "center", gap: 8, color: "#7C3AED", fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em" },
  title: { margin: "16px 0 12px", fontSize: 42, lineHeight: 1.05, letterSpacing: "-.04em", fontWeight: 950 },
  copy: { color: "#7B86AA", lineHeight: 1.7, fontWeight: 600 },
  label: { display: "block", marginTop: 20, marginBottom: 8, color: "#5D6685", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em" },
  textarea: { width: "100%", border: "1px solid #E3E7F4", borderRadius: 18, padding: 16, fontSize: 15, lineHeight: 1.6, outline: "none", resize: "none", fontFamily: "inherit" },
  input: { width: "100%", border: "1px solid #E3E7F4", borderRadius: 18, padding: 15, fontSize: 15, outline: "none", fontFamily: "inherit" },
  generate: { marginTop: 22, width: "100%", border: "none", borderRadius: 18, padding: "17px 22px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "linear-gradient(135deg,#6366F1,#A855F7,#FB7185)", color: "white", fontWeight: 950, fontSize: 16, boxShadow: "0 18px 38px rgba(168,85,247,.25)" },
  error: { marginTop: 14, color: "#E11D48", fontWeight: 800, fontSize: 14 },
  right: { display: "grid", gap: 18 },
  panel: { background: "rgba(255,255,255,.86)", border: "1px solid #E5E8F5", borderRadius: 28, padding: 24, boxShadow: "0 26px 70px rgba(99,102,241,.09)" },
  panelHead: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start", marginBottom: 18 },
  panelKicker: { color: "#8B5CF6", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em" },
  panelTitle: { margin: "5px 0 0", fontSize: 28, letterSpacing: "-.03em" },
  status: { borderRadius: 999, padding: "9px 14px", background: "#F4F1FF", color: "#7C3AED", fontWeight: 900, fontSize: 13 },
  stageList: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 12 },
  stage: { display: "flex", alignItems: "center", gap: 12, border: "1px solid #E7EAF5", borderRadius: 18, padding: 14 },
  stageIcon: { width: 38, height: 38, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" },
  stageLabel: { fontWeight: 900 },
  stageSub: { marginTop: 3, color: "#8A94B8", fontSize: 13, fontWeight: 700 },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14 },
  resultCard: { background: "white", border: "1px solid #E5E8F5", borderRadius: 22, padding: 18 },
  resultTitle: { color: "#8A94B8", fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em" },
  resultValue: { marginTop: 8, color: "#111827", fontWeight: 900, lineHeight: 1.4 },
  resultSub: { marginTop: 8, color: "#7B86AA", fontWeight: 700 },
  screenshot: { gridColumn: "1 / -1", width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 22, border: "1px solid #E5E8F5" },
};
