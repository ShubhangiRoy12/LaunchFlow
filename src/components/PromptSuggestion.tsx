"use client";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { suggestLaunchPrompt } from "@/lib/promptDirection";

export default function PromptSuggestion({ prompt, mood, onApply }: { prompt: string; mood?: string; onApply: (value: string) => void }) {
  const suggestion = suggestLaunchPrompt(prompt, mood);
  if (!suggestion || prompt.startsWith("Create an energetic summer advertisement") || prompt.startsWith("Create a ") && prompt.includes("hero")) return null;
  return <aside style={{ marginTop: 14, padding: 16, background: "linear-gradient(120deg,#f3efff,#fff3f6)", border: "1px solid #e6dcfa", borderRadius: 8 }}>
    <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#7950bd", fontSize: 12, fontWeight: 800 }}><Sparkles size={16} />Suggested direction</div>
    <p style={{ color: "#52566c", fontSize: 14, lineHeight: 1.7, margin: "10px 0" }}>{suggestion}</p>
    <button type="button" onClick={() => onApply(suggestion)} style={{ display: "flex", alignItems: "center", gap: 6, border: 0, background: "transparent", color: "#7345b5", fontSize: 13, fontWeight: 800, cursor: "pointer", padding: 0 }}>Use this prompt <ArrowUpRight size={16} /></button>
  </aside>;
}
