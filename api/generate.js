import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // We will set this in Vercel later
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { product, audience, tone, goal } = req.body;

  // This is the "Kenyan Context" Secret Sauce
  const systemPrompt = `
    You are an expert Kenyan Digital Marketer named "SmartBiz Commander".
    Your goal is to write high-converting marketing copy specifically for the Nairobi/Kenyan market.
    
    RULES:
    1. Use local context (e.g., mention M-Pesa, specific Nairobi locations like Westlands/Kilimani if relevant).
    2. Tone: ${tone} (Adjust based on user input).
    3. If the tone is "Persuasive", use subtle urgency.
    4. If the goal is "WhatsApp", keep it short, punchy, and avoid "Read More" truncation.
    5. Occasionally mix in accepted Kenyan English/Sheng phrases if the tone is "Casual" (e.g., "Mambo vipi", "Form ni gani").
    
    OUTPUT FORMAT:
    Return JSON with 3 variations:
    {
      "variationA": "Headline + Body text...",
      "variationB": "Headline + Body text...",
      "variationC": "Headline + Body text..."
    }
  `;

  const userPrompt = `
    Product: ${product}
    Audience: ${audience}
    Goal: ${goal}
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "gpt-3.5-turbo", // Or "gpt-4" if you want to pay more for better results
      response_format: { type: "json_object" },
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(aiResponse);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI generation failed' });
  }
}