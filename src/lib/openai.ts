import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function scoreVideo(title: string, description: string, channelTitle: string) {
    const prompt = `
    Analyze this YouTube video for an AI Engineer who values "Human-Language" explanations, Frontier Models, and Practical Use Cases.
    
    The user specifically LOVES:
    - Frontier Models: ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google).
    - Practical AI Use Cases: Real-world applications, "How to build X with AI", "Agentic Workflows".
    - Applied AI Tools: Cursor, V0, Replit, etc.
    - Creators like Tina Huang and Nate B. Jones.

    The user specifically DISLIKES:
    - Generic Enterprise Cloud content (AWS, Amazon Sagemaker, Azure, Google Cloud Platform infrastructure) UNLESS it is strictly about deploying the 3 frontier models above.
    - Heavy corporate marketing / "Enterprise-speak".
    - Pure hype / "Game Over" / "AGI is here" clickbait.

    Video: "${title}"
    Channel: "${channelTitle}"
    Description: "${description.slice(0, 500)}..."

    Task:
    1. Detect Hype/Clickbait.
    2. Assess Relevance to User Preferences (Frontier Models & Practical Use Cases vs. Enterprise Cloud).
    3. Assign Utility Score.
    
    Return a JSON object:
    {
      "isHype": boolean, // true if it's clickbait OR if it's generic Enterprise Cloud/AWS content that isn't about the frontier models.
      "utilityScore": number, // 1-10. Give High scores (8-10) for ChatGPT/Claude/Gemini/Practical Apps. Give Low scores (1-4) for AWS/Sagemaker/Enterprise marketing.
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
