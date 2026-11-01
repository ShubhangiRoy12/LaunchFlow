import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type LaunchFlowVideoProps = {
  productName: string;
  tagline: string;
  audience?: string;
  features: string[];
  storyboard: string[];
  screenshot?: string;
};

const sceneLength = 120;
const gradients = [
  "linear-gradient(135deg, #F8FBFF 0%, #EEF2FF 46%, #FFF1F6 100%)",
  "linear-gradient(135deg, #111827 0%, #312E81 52%, #DB2777 100%)",
  "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 45%, #FAF5FF 100%)",
  "linear-gradient(135deg, #080B1A 0%, #1E1B4B 48%, #0EA5E9 100%)",
  "linear-gradient(135deg, #FDF2F8 0%, #EEF2FF 50%, #ECFEFF 100%)",
];

export const LaunchFlowVideo = (props: LaunchFlowVideoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneIndex = Math.min(4, Math.floor(frame / sceneLength));
  const local = frame - sceneIndex * sceneLength;
  const fade = fadeScene(local);
  const pop = spring({ frame: local, fps, config: { damping: 120, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ background: gradients[sceneIndex], fontFamily: "Inter, Arial, sans-serif", overflow: "hidden" }}>
      <SoftBackground dark={sceneIndex === 1 || sceneIndex === 3} frame={frame} />
      {sceneIndex === 0 && <HeroScene {...props} fade={fade} pop={pop} local={local} />}
      {sceneIndex === 1 && <ProblemScene {...props} fade={fade} pop={pop} local={local} />}
      {sceneIndex === 2 && <ProductScene {...props} fade={fade} pop={pop} local={local} />}
      {sceneIndex === 3 && <StoryboardScene {...props} fade={fade} pop={pop} local={local} />}
      {sceneIndex === 4 && <FinalScene {...props} fade={fade} pop={pop} local={local} />}
    </AbsoluteFill>
  );
};

function HeroScene({ productName, tagline, screenshot, fade, pop, local }: LaunchFlowVideoProps & SceneProps) {
  return (
    <AbsoluteFill style={{ opacity: fade, alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...badgeStyle, transform: `translateY(${interpolate(local, [0, 45], [26, 0])}px)` }}>AI Launch Film</div>
      <h1 style={{ ...titleStyle, transform: `scale(${0.94 + pop * 0.06})` }}>{productName}</h1>
      <p style={subtitleStyle}>{tagline}</p>
      <BrowserMock screenshot={screenshot} style={{ marginTop: 58, transform: `translateY(${interpolate(local, [0, 100], [70, -12])}px) scale(${0.88 + pop * 0.12})` }} />
    </AbsoluteFill>
  );
}

function ProblemScene({ productName, audience, fade, pop, local }: LaunchFlowVideoProps & SceneProps) {
  const cards = ["Messaging feels scattered", "Launch assets take weeks", "Storyboards need a creative team"];
  return (
    <AbsoluteFill style={{ opacity: fade, color: "white", padding: "130px 150px" }}>
      <div style={darkKicker}>The launch problem</div>
      <h2 style={darkTitle}>Great products still need a story people understand fast.</h2>
      <p style={darkSub}>{productName} speaks to {audience || "modern product teams"} with a clear launch narrative.</p>
      <div style={{ display: "flex", gap: 28, marginTop: 70 }}>
        {cards.map((card, index) => (
          <GlassCard key={card} delay={index * 8} frame={local} pop={pop}>{card}</GlassCard>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function ProductScene({ features, screenshot, fade, pop, local }: LaunchFlowVideoProps & SceneProps) {
  return (
    <AbsoluteFill style={{ opacity: fade, padding: "110px 130px", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 70, alignItems: "center" }}>
      <div>
        <div style={badgeStyle}>Product intelligence</div>
        <h2 style={{ ...sectionTitle, marginTop: 26 }}>Website to launch video, automatically.</h2>
        <p style={sectionSub}>LaunchFlow extracts the page, understands the offer, and turns it into a polished visual story.</p>
        <div style={{ display: "grid", gap: 18, marginTop: 42 }}>
          {(features || []).slice(0, 4).map((feature, index) => (
            <FeatureRow key={feature} text={feature} index={index} frame={local} />
          ))}
        </div>
      </div>
      <BrowserMock screenshot={screenshot} style={{ transform: `perspective(1400px) rotateY(-10deg) rotateX(4deg) scale(${0.9 + pop * 0.1})` }} />
    </AbsoluteFill>
  );
}

function StoryboardScene({ storyboard, fade, local }: LaunchFlowVideoProps & SceneProps) {
  return (
    <AbsoluteFill style={{ opacity: fade, color: "white", padding: "120px 140px", justifyContent: "center" }}>
      <div style={darkKicker}>Creative director</div>
      <h2 style={darkTitle}>The story is built before the video renders.</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 78 }}>
        {(storyboard || ["Hook", "Problem", "Solution", "Features", "CTA"]).slice(0, 5).map((item, index) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ ...timelineCard, opacity: interpolate(local, [index * 12, index * 12 + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              <span style={{ color: "#C4B5FD", fontWeight: 900 }}>0{index + 1}</span>
              <strong>{item}</strong>
            </div>
            {index < 4 && <div style={{ width: 34, height: 2, background: "rgba(255,255,255,.28)" }} />}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function FinalScene({ productName, tagline, fade, pop, local }: LaunchFlowVideoProps & SceneProps) {
  return (
    <AbsoluteFill style={{ opacity: fade, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ ...badgeStyle, marginBottom: 28 }}>Ready to export</div>
      <h2 style={{ ...titleStyle, fontSize: 112, transform: `scale(${0.94 + pop * 0.06})` }}>{productName}</h2>
      <p style={subtitleStyle}>{tagline}</p>
      <div style={{ ...exportBar, transform: `translateY(${interpolate(local, [20, 90], [70, 0])}px)` }}>
        <span>16:9 Launch Film</span>
        <span>Motion Design</span>
        <span>MP4 Export</span>
      </div>
    </AbsoluteFill>
  );
}

type SceneProps = { fade: number; pop: number; local: number };

function BrowserMock({ screenshot, style }: { screenshot?: string; style?: React.CSSProperties }) {
  const src = screenshot ? staticFile(screenshot.replace(/^\//, "")) : undefined;
  return (
    <div style={{ ...browserStyle, ...style }}>
      <div style={browserTop}><span /><span /><span /></div>
      {src ? <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <MockDashboard />}
    </div>
  );
}

function MockDashboard() {
  return (
    <div style={{ padding: 34, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ gridColumn: "1 / -1", height: 54, borderRadius: 18, background: "linear-gradient(90deg,#C4B5FD,#F9A8D4)" }} />
      {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 96, borderRadius: 22, background: i % 2 ? "#EEF2FF" : "#FDF2F8" }} />)}
    </div>
  );
}

function SoftBackground({ dark, frame }: { dark: boolean; frame: number }) {
  return (
    <>
      <div style={{ position: "absolute", width: 620, height: 620, borderRadius: 999, left: -180, top: 80, background: dark ? "rgba(99,102,241,.22)" : "rgba(99,102,241,.16)", filter: "blur(20px)", transform: `translateX(${Math.sin(frame / 60) * 24}px)` }} />
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 999, right: -160, bottom: -90, background: dark ? "rgba(236,72,153,.24)" : "rgba(251,113,133,.18)", filter: "blur(22px)" }} />
    </>
  );
}

function GlassCard({ children, delay, frame, pop }: { children: React.ReactNode; delay: number; frame: number; pop: number }) {
  const opacity = interpolate(frame, [delay, delay + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ ...glassCard, opacity, transform: `translateY(${(1 - pop) * 28}px)` }}>{children}</div>;
}

function FeatureRow({ text, index, frame }: { text: string; index: number; frame: number }) {
  const opacity = interpolate(frame, [index * 10, index * 10 + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ ...featureRow, opacity }}><span>✦</span>{text}</div>;
}

function fadeScene(local: number) {
  const fadeIn = interpolate(local, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(local, [100, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
}

const badgeStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", alignSelf: "center", padding: "14px 24px", borderRadius: 999, color: "#6D5DFB", background: "rgba(255,255,255,.76)", border: "1px solid rgba(124,58,237,.16)", fontSize: 28, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" };
const titleStyle: React.CSSProperties = { color: "#101426", fontSize: 132, fontWeight: 950, letterSpacing: -6, lineHeight: .95, margin: "36px 0 0", textAlign: "center", maxWidth: 1500 };
const subtitleStyle: React.CSSProperties = { color: "#6B7395", fontSize: 42, fontWeight: 650, lineHeight: 1.35, marginTop: 30, maxWidth: 1040, textAlign: "center" };
const darkKicker: React.CSSProperties = { color: "#C4B5FD", fontSize: 27, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2 };
const darkTitle: React.CSSProperties = { color: "white", fontSize: 84, lineHeight: 1.03, letterSpacing: -4, fontWeight: 950, maxWidth: 1260, margin: "28px 0 0" };
const darkSub: React.CSSProperties = { color: "rgba(255,255,255,.72)", fontSize: 34, lineHeight: 1.45, maxWidth: 980, marginTop: 30, fontWeight: 600 };
const sectionTitle: React.CSSProperties = { color: "#101426", fontSize: 78, lineHeight: 1.03, letterSpacing: -4, fontWeight: 950 };
const sectionSub: React.CSSProperties = { color: "#6B7395", fontSize: 31, lineHeight: 1.45, marginTop: 28, fontWeight: 650 };
const browserStyle: React.CSSProperties = { width: 760, height: 500, overflow: "hidden", borderRadius: 34, background: "white", border: "1px solid rgba(203,213,225,.85)", boxShadow: "0 44px 120px rgba(79,70,229,.22)" };
const browserTop: React.CSSProperties = { height: 48, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB", display: "flex", gap: 9, alignItems: "center", paddingLeft: 22 };
const glassCard: React.CSSProperties = { flex: 1, minHeight: 210, padding: 32, borderRadius: 32, color: "white", fontSize: 33, lineHeight: 1.22, fontWeight: 850, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", backdropFilter: "blur(20px)", boxShadow: "0 28px 80px rgba(0,0,0,.16)" };
const featureRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 18, background: "white", border: "1px solid #E5E7EB", borderRadius: 24, padding: "23px 26px", color: "#111827", fontSize: 27, fontWeight: 850, boxShadow: "0 18px 50px rgba(99,102,241,.08)" };
const timelineCard: React.CSSProperties = { width: 260, minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28, borderRadius: 30, color: "white", fontSize: 30, lineHeight: 1.1, background: "rgba(255,255,255,.13)", border: "1px solid rgba(255,255,255,.22)", boxShadow: "0 28px 80px rgba(0,0,0,.18)" };
const exportBar: React.CSSProperties = { marginTop: 64, display: "flex", gap: 18, padding: 18, borderRadius: 28, background: "rgba(255,255,255,.82)", border: "1px solid rgba(124,58,237,.16)", color: "#5B21B6", fontSize: 24, fontWeight: 900, boxShadow: "0 22px 70px rgba(99,102,241,.14)" };
