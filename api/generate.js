import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { mode, product, audience, strategy, tone } = req.body;

  // 1. REFINED SYSTEM PROMPT: Focus on being a Copywriter, not just a consultant.
  const systemPrompt = `You are a world-class Kenyan Marketing Copywriter. 
  Your goal is to write high-conversion content for the user's specific product.
  - DO NOT talk about 'SmartBiz' or general business tips unless that is the product.
  - FOCUS 100% on the Product: "${product}" and the Audience: "${audience}".
  - LANGUAGE: Use 'Sheng-infused' English or professional Nairobi English depending on the product type.
  - FORMAT: Return JSON with "variationA" and "variationB". Use HTML tags (<strong>, <br>) for formatting.`;

  // 2. TOOL SPECIFIC INSTRUCTIONS
  let userPrompt = "";

  if (mode === 'Viral Hooks') {
    userPrompt = `Write viral marketing hooks for a product called "${product}" targeting "${audience}".
    Strategy: ${strategy}.
    
    Variation A (TikTok Style): Create 3 "Stop the Scroll" hooks. Reference specific Nairobi lifestyle contexts where this product fits (e.g., Sunday brunch, morning commute, office slay).
    Variation B (Instagram/FB Style): A punchy caption that highlights the benefit of the product with localized emojis and a clear WhatsApp CTA.
    
    CRITICAL: The content must be about "${product}". Do NOT mention M-Pesa or 'Hustle' unless the product is financial.`;
  } 
  else if (mode === 'Debt Collection') {
    userPrompt = `Write 2 debt recovery messages for ${product} who owes money.
    Details: ${audience}.
    Tone: ${strategy}.
    - Variation A: Professional but firm.
    - Variation B: Direct and urgent.
    Use Kenyan polite/firm etiquette.`;
  }
  else {
    userPrompt = `Write marketing content for "${product}" targeting "${audience}".
    Tool Mode: ${mode}. Tone: ${strategy}.
    Provide two distinct, high-quality variations optimized for the Kenyan market.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // GPT-4o-mini is much better at following instructions
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }, 
      temperature: 0.8, // Slightly higher for better creativity in marketing
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(aiResponse);

  } catch (error) {
    console.error("SmartBiz AI Error:", error);
    res.status(500).json({ 
        variationA: "<strong>Error:</strong> The AI is currently over-taxed. Please try again.", 
        variationB: "Check OpenAI balance or Vercel Logs." 
    });
  }
}