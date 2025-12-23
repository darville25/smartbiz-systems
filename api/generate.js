import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // 1. Security & Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 2. Destructure payload from SmartBiz v3.1
  // Frontend sends: { mode, input, details, strategy }
  const { mode, input, details, strategy } = req.body;

  // 3. System Prompt (The "Kenyan Business Brain")
  const systemPrompt = `You are "SmartBiz Commander", the elite AI Operations OS for Kenyan SMEs.
  Your personality:
  - Localized: You understand M-Pesa, 'Biashara' culture, KRA, and Nairobi corporate etiquette.
  - Language: Professional English mixed with natural Kenyan context (and light Swahili reminders like 'Asante', 'Tafadhali' if the tone is friendly).
  - Currency: Always use KES.
  - Output Format: You MUST return a JSON object with two keys: "variationA" and "variationB". Use HTML tags (<strong>, <br>) for formatting.`;

  // 4. Logic per Tool Mode
  let userPrompt = "";

  if (mode === 'Debt Collection') {
    userPrompt = `Generate 2 debt recovery messages for a client named ${input}.
    Debt Details: ${details}.
    Strategy/Tone: ${strategy}.
    - Variation A: A high-conversion message specifically for WhatsApp.
    - Variation B: A follow-up message with a different angle.
    If Strategy is 'Friendly', sound like a concerned partner. If 'Firm', mention consequences like CRB or legal escalation professionally.`;
  } 
  else if (mode === 'Viral Hooks') {
    userPrompt = `Generate viral marketing hooks for: ${input}.
    Target Audience: ${details}.
    Strategy: ${strategy}.
    - Variation A: 3 Hard-hitting TikTok/Reels hooks using Nairobi trends.
    - Variation B: A Facebook/Instagram ad caption with a clear CTA to WhatsApp.`;
  }
  else if (mode === 'WhatsApp Agent') {
    userPrompt = `You are configuring a WhatsApp Sales Agent for a business called "${input}".
    Knowledge Base/Catalog: "${details}".
    - Variation A: A warm, automated Welcome Message that asks a qualifying question.
    - Variation B: A short FAQ auto-reply based on the catalog provided.`;
  }
  else {
    // Fallback for other tools (Ads, Scripts, etc.)
    userPrompt = `Task: ${mode}.
    Primary Subject: ${input}.
    Context/Details: ${details}.
    Tone: ${strategy}.
    Provide two distinct, high-quality variations optimized for the Kenyan market.`;
  }

  try {
    // 5. Call OpenAI with JSON Mode
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Faster and cheaper for production
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }, 
      temperature: 0.7,
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    
    // 6. Return response to Frontend
    res.status(200).json(aiResponse);

  } catch (error) {
    console.error("SmartBiz AI Error:", error);
    res.status(500).json({ 
        variationA: "<strong>System Alert:</strong> OpenAI balance low or API error. Please check Vercel logs.", 
        variationB: "<strong>Technical Issue:</strong> Connection to SmartBiz Commander timed out." 
    });
  }
}