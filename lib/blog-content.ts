const HTML_ENTITY: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function decodeEntities(text: string): string {
  return text.replace(/&(?:#x[\da-f]+|#\d+|amp|lt|gt|quot|nbsp);/gi, (m) => {
    if (HTML_ENTITY[m.toLowerCase()]) return HTML_ENTITY[m.toLowerCase()];
    return m;
  });
}

function extractCodeBlocks(html: string): { text: string; blocks: string[] } {
  const blocks: string[] = [];
  let text = html;

  text = text.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, inner) => {
    const code = decodeEntities(inner.replace(/<[^>]+>/g, "").trim());
    const idx = blocks.length;
    blocks.push(code);
    return `\n\n__CODE_BLOCK_${idx}__\n\n`;
  });

  text = text.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/gi,
    (_, inner) => `\`${decodeEntities(inner.replace(/<[^>]+>/g, "").trim())}\``
  );

  return { text, blocks };
}

function htmlToStructuredText(html: string): string {
  let text = html;
  const { text: withPlaceholders, blocks } = extractCodeBlocks(text);
  text = withPlaceholders;

  text = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "");

  text = decodeEntities(text);
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  blocks.forEach((code, idx) => {
    const fence = "```\n" + code + "\n```";
    text = text.replace(`__CODE_BLOCK_${idx}__`, fence);
  });

  return text;
}

/** Normalize RSS/blog body for markdown rendering (plain text or HTML). */
export function prepareBlogMarkdown(raw: string): string {
  if (!raw?.trim()) return "";

  const hasHtml = /<[a-z][\s\S]*>/i.test(raw);
  let text = hasHtml ? htmlToStructuredText(raw) : raw;

  text = decodeEntities(text);
  text = text.replace(/\r\n/g, "\n");

  return text.trim();
}
