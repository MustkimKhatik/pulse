const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

async function generateText(
  prompt: string,
  options?: { useSearch?: boolean }
): Promise<string> {
  const body: Record<string, unknown> = {
    contents: [{ parts: [{ text: prompt }] }],
  };
  if (options?.useSearch) {
    body.tools = [{ google_search: {} }];
  }

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

export async function fetchNewsDigest(prompt: string): Promise<string> {
  return generateText(prompt, { useSearch: true });
}

export async function generateOneLineSummary(content: string): Promise<string> {
  const prompt = `Summarize the following in one crisp sentence (max 20 words): ${content}`;
  const summary = await generateText(prompt);
  return summary.trim().split("\n")[0] ?? "";
}
