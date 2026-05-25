/** First two sentences from RSS snippet (Category B). */
export function blogSummaryFromSnippet(snippet: string): string {
  const plain = snippet
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) return "";

  const sentences = plain.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [plain];
  const two = sentences.slice(0, 2).join(" ").trim();
  return two || plain.slice(0, 160);
}
