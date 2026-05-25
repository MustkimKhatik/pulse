/** Plain-text preview for feed cards (strip markdown/HTML noise). */
export function contentPreview(raw: string, maxLen = 200): string {
  let text = raw
    .replace(/```[\s\S]*?```/g, "[code]")
    .replace(/`[^`]+`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "…";
}
