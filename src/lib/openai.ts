import OpenAI from 'openai';

export async function scoreVideo(title: string, description: string, channelTitle: string) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.warn('OPENAI_API_KEY is missing. Skipping scoreVideo.');
        return null;
    }

    const openai = new OpenAI({
        apiKey: apiKey,
    });

    const prompt = `
    Analyze this YouTube video for an AI Engineer who values "Human-Language" explanations, Frontier Models, and Practical Use Cases.
    
    The user specifically LOVES (HIGH PRIORITY):
    - "Claude Code" - Anthropic's AI coding assistant (PRIORITY!)
    - Frontier Models: ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google).
    - AI Coding Tools: Cursor, V0, Replit, Windsurf, Bolt.
    - Practical AI Use Cases: Real-world applications, "How to build X with AI", "Agentic Workflows".
    - Indie Hacker / Startup perspective over Enterprise.
    - Creators like Tina Huang, Nate B. Jones, IndyDevDan, Fireship.

    The user specifically DISLIKES (PENALIZE HEAVILY):
    - Generic Enterprise Cloud content: AWS, Amazon Sagemaker, Azure, GCP infrastructure.
    - IMPORTANT: Mark AWS/Enterprise content as "isHype: true" UNLESS it's strictly about deploying a frontier model.
    - Heavy corporate marketing / "Enterprise-speak".
    - Pure hype / "Game Over" / "AGI is here" clickbait.

    Video: "${title}"
    Channel: "${channelTitle}"
    Description: "${description.slice(0, 500)}..."

    Task:
    1. Detect Hype/Clickbait or Enterprise Cloud marketing.
    2. Assess Relevance: Claude Code > Other Frontier Tools > Enterprise Cloud.
    3. Assign Utility Score.
    
    Return a JSON object:
    {
      "isHype": boolean, // true if clickbait OR generic AWS/Enterprise content.
      "utilityScore": number, // 9-10: Claude Code/Frontier Tools. 6-8: Other practical AI. 1-4: AWS/Enterprise.
      "summary": "1 sentence takeaway focusing on the practical value."
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

