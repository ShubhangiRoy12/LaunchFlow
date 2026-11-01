export function suggestLaunchPrompt(input: string, mood = "Cinematic and premium") {
  const brief = input.trim().slice(0, 1200);
  if (!brief) return "";
  if (/mango|juice|drink|beverage/i.test(brief)) return `Create an energetic summer advertisement for ${brief.replace(/^i (want|need)\s+(an?\s+)?(advertisement|ad|video)\s+(of|for)\s+/i, "")}. Show chilled packaging, fresh fruit, sparkling splashes and sunlit closeups. Smooth camera movement, vibrant color, a refreshing mood and a bold final product reveal.`;
  if (/app|saas|website|software|dashboard/i.test(brief)) return `Create a ${mood.toLowerCase()} launch film: ${brief}. Open with a striking product reveal, show clear interface closeups and one key benefit, then finish on a polished hero shot. Clean typography and smooth transitions.`;
  return `Create a ${mood.toLowerCase()} product advertisement: ${brief}. Open with a memorable visual hook, show the product in use with detailed closeups, highlight its main benefit and finish with a confident hero reveal. Consistent lighting and smooth camera movement.`;
}
