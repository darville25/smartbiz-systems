// services.js
// The 3 service verticals to generate pSEO hub-and-spoke pages for.
// Pricing pulled from product-marketing.md (master reference).

module.exports = [
  {
    slug: "seo-schema-markup-kenya",
    name: "SEO & Schema Markup",
    keyword: "SEO & Schema Markup",
    shortTag: "SEO & Schema Markup",
    icon: "fa-magnifying-glass-chart",
    accent: "#1a7a5e", // brand green — SEO/WhatsApp accent
    whatsappMsg: "Hi SmartBiz, I want an SEO and schema markup audit for my business",
    metaVerb: "rank higher on Google",
    painPoints: [
      "Your competitors show up on Google and you don't — even though your business is just as good",
      "Your website has no schema markup, so Google can't understand what you actually offer",
      "You're not showing up in the Google Maps 3-pack for local searches",
      "You've never had a technical SEO audit, so you don't know what's actually broken",
    ],
    features: [
      "Full technical SEO audit — site speed, indexing, crawl errors, mobile usability",
      "On-page optimisation for the exact keywords your customers are searching",
      "Schema markup implementation — LocalBusiness, Service, FAQPage and Review schema",
      "Google Business Profile optimisation for local map pack rankings",
      "Ongoing keyword tracking and monthly reporting",
    ],
    pricingTable: [
      { name: "Starter (Local Maps)", price: "KES 40,000/mo" },
      { name: "Growth (Content + Tech)", price: "KES 80,000/mo" },
      { name: "Domination (National)", price: "KES 150,000/mo" },
    ],
    proof: "We helped a Kenyan school achieve a significant jump in organic traffic after implementing technical SEO and schema markup — they now rank for admissions-related searches across Kenya. Modern Homes Interiors ranked #1 for their main Nairobi keywords within months of working with us.",
    faqs: [
      {
        q: "How long does SEO take to show results in {city}?",
        a: "Most {city} clients start seeing movement in rankings within 4–8 weeks, with stronger gains by month 3. SEO is a compounding system, not an overnight fix — but schema markup often improves how your listing appears on Google within days.",
      },
      {
        q: "What is schema markup and why does my {city} business need it?",
        a: "Schema markup is structured code that tells Google exactly what your business does, where you're located, and what people say about you. Without it, Google has to guess — with it, you're far more likely to appear in rich results, star ratings, and the local map pack for {city} searches.",
      },
      {
        q: "Do you guarantee first-page rankings?",
        a: "No agency honestly can — anyone who guarantees #1 rankings is not being straight with you. What we do guarantee is a properly implemented technical foundation, correct schema, and a documented monthly process so your {city} business climbs the rankings steadily and sustainably.",
      },
      {
        q: "Can you work with my existing website, or do I need a new one?",
        a: "In most cases we work with your existing site. We'll only recommend a rebuild if the current site is structurally holding back your SEO — for example, no clean URLs, no mobile responsiveness, or a platform that blocks proper schema implementation.",
      },
    ],
  },
  {
    slug: "paid-advertising-kenya",
    name: "Paid Advertising Management",
    keyword: "Paid Advertising",
    shortTag: "Google & Meta Ads",
    icon: "fa-bullhorn",
    accent: "#C8A84B", // brand gold — Paid Ads accent
    whatsappMsg: "Hi SmartBiz, I want help managing my Google and Meta ads",
    metaVerb: "turn ad spend into paying customers",
    painPoints: [
      "You're spending money on Facebook and Google ads but have no idea what's actually converting",
      "Leads come in from your ads but nobody follows up fast enough to close them",
      "You don't have proper tracking, so you can't tell which ad, which audience, or which offer is working",
      "Your ad account was set up once and never optimised since",
    ],
    features: [
      "Google Ads and Meta (Facebook/Instagram) campaign setup and management",
      "Proper conversion tracking via Google Tag Manager and Meta Pixel",
      "Audience research and targeting built for the Kenyan market",
      "Landing pages designed to convert, not just collect clicks",
      "WhatsApp + CRM integration so every lead is followed up instantly",
      "Transparent monthly reporting — spend, cost per lead, and ROAS",
    ],
    pricingTable: [
      { name: "Starter (FB/IG)", price: "KES 30,000/mo" },
      { name: "Growth (FB/IG + Google)", price: "KES 60,000/mo" },
      { name: "Scale (Full Funnel)", price: "KES 120,000/mo" },
    ],
    proof: "Our WhatsApp automation clients see leads qualified and followed up instantly the moment an ad click turns into a conversation — one logistics client doubled their conversion rate within 3 months once paid ads were connected to automated WhatsApp follow-up.",
    faqs: [
      {
        q: "How much should a {city} business spend on ads per month?",
        a: "It depends on your industry and goals, but most {city} SMEs start seeing meaningful data with KES 20,000–40,000/month in ad spend, separate from our management fee. Ad spend is always paid directly to Google or Meta by you — we never mark it up.",
      },
      {
        q: "Do you manage the ad spend budget, or just the account?",
        a: "You keep full control and ownership of your ad accounts and budget. We manage strategy, targeting, creative, and optimisation — the ad spend itself goes directly from your card or M-Pesa to Google or Meta, with zero markup from us.",
      },
      {
        q: "What makes paid ads different from SEO for my {city} business?",
        a: "Paid ads get you in front of customers today, while SEO builds long-term free traffic. Most {city} businesses that work with us run both — ads for immediate leads, SEO for the compounding, long-term win.",
      },
      {
        q: "How fast will I start getting leads?",
        a: "Once campaigns go live, most {city} clients start seeing leads within the first 3–7 days. The first 2 weeks are about gathering data — from week 3 onward we optimise hard based on what's actually converting.",
      },
    ],
  },
  {
    slug: "email-marketing-kenya",
    name: "Email Marketing & Sequences",
    keyword: "Email Marketing",
    shortTag: "Email Sequences & Automation",
    icon: "fa-envelope-open-text",
    accent: "#DC2626", // red — Email Marketing accent
    whatsappMsg: "Hi SmartBiz, I want to set up automated email sequences for my business",
    metaVerb: "turn cold leads into paying customers automatically",
    painPoints: [
      "You collect leads but never follow up with them by email — so they go cold and buy from someone else",
      "You send emails manually, one at a time, whenever you remember to",
      "You have no welcome sequence for new leads or customers",
      "Cold outreach for B2B deals is slow and inconsistent",
    ],
    features: [
      "Automated welcome and nurture sequences for new leads",
      "Cold email sequences for B2B outreach and partnerships",
      "Re-engagement flows for leads who went cold",
      "Industry-specific sequences — real estate, schools, SACCOs, insurance",
      "Integration with HubSpot or Brevo for full automation",
      "Copywriting done for you — no blank page, ever",
    ],
    pricingTable: [
      { name: "Starter", price: "KES 30,000 setup + KES 5,000/mo" },
      { name: "Growth", price: "KES 100,000 setup + KES 20,000/mo" },
      { name: "Premium", price: "Custom pricing" },
    ],
    proof: "Every sequence we build is designed around one principle: a lead who doesn't buy today shouldn't be a lead you lose forever. Our automation clients save 40+ hours a month on manual follow-up while their email list keeps converting quietly in the background.",
    faqs: [
      {
        q: "What's the difference between a welcome sequence and a nurture sequence?",
        a: "A welcome sequence introduces a new lead or customer to your {city} business right after signup — usually 3–5 emails over the first week. A nurture sequence runs longer, building trust over weeks or months until the lead is ready to buy.",
      },
      {
        q: "Will you write the emails, or do I need to?",
        a: "We write everything — copy, subject lines, and calls to action — based on your brand voice and your {city} customers' pain points. You review and approve before anything goes live.",
      },
      {
        q: "Can email marketing work alongside WhatsApp automation?",
        a: "Yes — most {city} clients run both together. WhatsApp handles instant, urgent follow-up, while email nurtures leads who need more time to decide. The two channels reinforce each other instead of competing.",
      },
      {
        q: "Do I need a big email list for this to work?",
        a: "No. Automation pays off even with a small list, because it's the consistency that converts, not the volume. Many {city} businesses start with under 200 contacts and still see a clear lift in conversions.",
      },
    ],
  },
];
