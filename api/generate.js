import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { product, audience, goal, mode, tone } = req.body;

  // 1. Define the System Personality (Kenyan Context)
  const systemPrompt = `You are "SmartBiz Commander", an elite Kenyan Business Consultant. 
  Your writing style is professional but localized for Nairobi.
  - Currency: KES.
  - Locations: Westlands, CBD, Industrial Area, Mombasa.
  - Context: You understand M-Pesa, 'Biashara', and corporate etiquette in Kenya.
  - Output: Return JSON with two keys: "variationA" and "variationB".`;

  // 2. Construct the Prompt based on the selected Tool
  let userPrompt = "";

  if (mode === 'Cold Call Script') {
    userPrompt = `Write 2 Cold Call Scripts.
    Target: "${product}" (Website/Profile).
    My Offer: "${audience}".
    Variation A: A researched, warm opener referencing their website.
    Variation B: A direct, CEO-to-CEO approach.`;
  } 
  else if (mode === 'Debt Collection') {
    userPrompt = `Write 2 Debt Collection messages.
    Client Name: "${product}".
    Debt Details: "${audience}".
    Variation A: A polite, professional reminder (WhatsApp friendly).
    Variation B: A firm final notice mentioning CRB listing consequences.`;
  } 
  else if (mode === 'Brand Pitch Email') {
    userPrompt = `Write 2 Influencer Brand Pitch Emails.
    Brand Name: "${product}".
    My Stats/Value: "${audience}".
    Variation A: Proposing a specific campaign idea.
    Variation B: Requesting a media kit review/meeting.`;
  }
  else if (mode === 'CV Bullet Points') {
    userPrompt = `Rewrite these CV tasks into high-impact achievements.
    Job Role: "${product}".
    Raw Tasks: "${audience}".
    Variation A: Focus on leadership and management.
    Variation B: Focus on hard numbers and efficiency.`;
  }
  else if (mode === 'Tender Proposal') {
    userPrompt = `Write sections for a Tender Proposal.
    Client: "${product}".
    Service: "${audience}".
    Variation A: Executive Summary tailored to Kenyan corporate standards.
    Variation B: Methodology section highlighting efficiency.`;
  }
  else if (mode === 'Viral Hooks') {
    userPrompt = `Write Viral TikTok/Reels Hooks.
    Topic: "${product}".
    Niche: "${audience}".
    Variation A: 3 Controversial/Shocking Hooks.
    Variation B: 3 "Educational/Secret" Hooks.`;
  }
  else {
    // Default: Ads, WhatsApp Scripts, Blogs
    userPrompt = `Write content for: ${mode}.
    Product/Topic: "${product}".
    Target Audience: "${audience}".
    Goal: "${goal}".
    Tone: "${tone}".
    Variation A: Primary option.
    Variation B: Alternative angle.
    Make it punchy and formatted with HTML tags (<br>, <strong>) for readability.`;
  }

  try {
    // 3. Call OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }, // Forces JSON structure
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(aiResponse);

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ 
        variationA: "Error generating content. Please try again.", 
        variationB: "System is currently overloaded." 
    });
  }
}