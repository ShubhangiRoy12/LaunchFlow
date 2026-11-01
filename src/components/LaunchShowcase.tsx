"use client";

import { ArrowUpRight, Clapperboard, Palette, ScanLine, Sparkles } from "lucide-react";
import "./launch-showcase.css";

const examples = [
  { name: "Freshness, in motion.", kind: "Physical product / beverage", file: "/mango_juice_product.mp4", prompt: "Create a cinematic mango drink commercial. Reveal a chilled mango juice can with fresh mango slices, sparkling water splashes, condensation, warm sunlight and an energetic final product shot." },
  { name: "Make the idea the hero.", kind: "Digital product / creative tools", file: "/canva.mp4", prompt: "Create an elegant launch film for a creative design app. Show colorful design canvases, smooth interface closeups, a creator bringing an idea to life, and a confident final product reveal." },
];

export default function LaunchShowcase({ onSelect }: { onSelect: (prompt: string) => void }) {
  const select = (prompt: string) => { onSelect(prompt); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="lf-showcase">
    <section id="examples" className="lf-section">
      <div className="lf-section-heading lf-gallery-heading"><div><span className="lf-eyebrow">LAUNCH INSPIRATION</span><h2 style={{ fontWeight: 700, lineHeight: 1.25 }}>Small films. Big first impressions.</h2></div><p>Fresh product reveals and creative brand stories.</p></div>
      <div className="lf-example-grid">{examples.map(example => <article className="lf-example" key={example.name}>
        <video controls preload="metadata" playsInline src={example.file + "#t=0.1"} aria-label={example.name} />
        <div className="lf-example-caption"><div><span>{example.kind}</span><h3>{example.name}</h3></div><button className="lf-use-style" title="Fill your launch prompt with this creative direction" aria-label={`Use ${example.kind} style`} onClick={() => select(example.prompt)}>Use this style<ArrowUpRight size={16} /></button></div>
      </article>)}</div>
      <p className="lf-note">Sample films created with external AI tools. New generations depend on your connected provider.</p>
    </section>
    <section id="how-it-works" className="lf-section lf-process">
      <div className="lf-section-heading"><div><span className="lf-eyebrow">FROM THE FIRST SPARK</span><h2>Your idea. Its opening scene.</h2></div></div>
      <div className="lf-process-grid">{[
        [ScanLine, "01", "Start with your product", "Bring a product idea and describe what makes it worth launching."],
        [Palette, "02", "Set the creative direction", "Choose your mood, product category, and the feeling you want to leave behind."],
        [Clapperboard, "03", "Make the reveal", "Generate a clip, review the result, and download your next launch moment."],
      ].map(([Icon, number, title, copy]) => { const Mark = Icon as typeof ScanLine; return <div className="lf-process-item" key={String(number)}><div className="lf-process-top"><Mark size={23} /><span>{String(number)}</span></div><h3>{String(title)}</h3><p>{String(copy)}</p></div>; })}</div>
    </section>
    <section className="lf-section lf-direction"><div><span className="lf-eyebrow">CREATIVE DIRECTIONS</span><h2>Find your signature.</h2><p>Pick a starting point. Make it yours.</p></div><div className="lf-directions">{["Cinematic product reveal", "Playful and energetic", "Minimal app launch", "Emotional brand story"].map(name => <button key={name} onClick={() => select(`Create a ${name.toLowerCase()} video for my product. Focus on its most distinctive benefit, a memorable visual hook and a polished final reveal.`)}><Sparkles size={18} />{name}<ArrowUpRight size={17} /></button>)}</div></section>
    <footer className="lf-footer"><strong>LaunchFlow AI</strong><span>Every great product deserves an entrance.</span><a href="#examples">Back to the films <ArrowUpRight size={15} /></a></footer>
  </div>;
}
