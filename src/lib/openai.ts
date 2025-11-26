import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function scoreVideo(title: string, description: string, channelTitle: string) {
    const prompt = `
    Analyze this YouTube video for an AI Engineer.
    
    Video: "${title}"
    Channel: "${channelTitle}"
    Description: "${description.slice(0, 300)}..."

    Task:
    1. Detect Hype/Clickbait (Is it "Game Over", "Scary", "AGI is here"?).
    2. Assess Utility (Is it a tutorial, code walkthrough, or deep dive?).
    
    Return a JSON object:
    {
      "isHype": boolean, // true if it's mostly news/speculation/reaction
      "utilityScore": number, // 1-10 (10 = pure code tutorial, 1 = pure reaction)
      "summary": "1 sentence takeaway"
    }
  `;

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) return null;

    try {
        return JSON.parse(content);
    } catch (e) {
        console.error('Failed to parse OpenAI response', e);
        return null;
    }
}
