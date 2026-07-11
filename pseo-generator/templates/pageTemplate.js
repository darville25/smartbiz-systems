// pageTemplate.js
// Generates a full HTML page for one (service x city) combination.
// Brand reference: product-marketing.md — light theme (Background #F8FAFC, Card #FFFFFF),
// Primary Blue #2563EB / Blue Hover #1D4ED8, Dark Text #0F172A, Body Text #475569,
// Border #E2E8F0, WhatsApp Green #25D366.

const WHATSAPP_NUMBER = "254740239241"; // updated business number
const WHATSAPP_DISPLAY = "+254 740 239 241";
const EMAIL = "info@smartbizsystems.co.ke";
const BASE_URL = "https://www.smartbizsystems.co.ke";

function waLink(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function slugTitle(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildFaqSchema(faqs, city) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.replace(/{city}/g, city.name),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/{city}/g, city.name),
      },
    })),
  };
}

function buildServiceSchema(service, city, url) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.keyword,
    provider: {
      "@type": "LocalBusiness",
      name: "SmartBizSystems",
      image: `${BASE_URL}/assets/logo.png`,
      telephone: WHATSAPP_DISPLAY,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Westlands, Nairobi",
        addressCountry: "KE",
      },
      areaServed: city.name,
      url: BASE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    url,
  };
}

function otherCitiesLinks(service, cities, currentSlug) {
  return cities
    .filter((c) => c.slug !== currentSlug)
    .slice(0, 6)
    .map(
      (c) =>
        `<a href="/${service.slug}/${c.slug}" class="text-primary hover:text-primaryHover underline underline-offset-2">${c.name}</a>`
    )
    .join(", ");
}

function otherServicesNav(currentSlug) {
  // Only link to pages that actually exist. The 3 new pSEO services
  // (seo-schema-markup-kenya, paid-advertising-kenya, email-marketing-kenya)
  // don't have hub/index pages yet — city-to-city cross-linking is handled
  // lower on the page instead, so we don't nav-link to a 404.
  return `<a href="/services/whatsapp-automation" class="hover:text-darktext transition">WhatsApp Automation</a>`;
}

function generatePage(service, city, cities) {
  const cleanUrl = `${BASE_URL}/${service.slug}/${city.slug}`;
  const url = cleanUrl; // canonical uses clean URL — matches site's cleanUrls:true config
  const title = `${service.keyword} ${city.name} | SmartBizSystems`;
  const metaDescription = `${service.keyword} for businesses in ${city.name}, Kenya. Help your ${city.name} business ${service.metaVerb} — priced for SMEs, built by SmartBizSystems. Free audit available.`;

  const faqSchema = JSON.stringify(buildFaqSchema(service.faqs, city), null, 2);
  const serviceSchema = JSON.stringify(buildServiceSchema(service, city, url), null, 2);

  const painPointsHtml = service.painPoints
    .map(
      (p) => `
        <li class="flex items-start gap-3">
          <i class="fa-solid fa-circle-exclamation text-red-500 mt-1"></i>
          <span class="text-bodytext">${p}</span>
        </li>`
    )
    .join("");

  const featuresHtml = service.features
    .map(
      (f) => `
        <li class="flex items-start gap-3">
          <i class="fa-solid fa-check text-[${service.accent}] mt-1"></i>
          <span class="text-bodytext">${f}</span>
        </li>`
    )
    .join("");

  const pricingHtml = service.pricingTable
    .map(
      (p) => `
        <div class="rounded-xl border border-slate-200 border-t-4 border-t-[${service.accent}] bg-white shadow-sm p-6 text-center">
          <p class="text-sm uppercase tracking-wide text-slate-500 mb-2">${p.name}</p>
          <p class="text-2xl font-extrabold text-darktext">${p.price}</p>
        </div>`
    )
    .join("");

  const faqHtml = service.faqs
    .map(
      (f) => `
        <div class="border-b border-slate-200 py-5">
          <h3 class="text-lg font-semibold text-darktext mb-2">${f.q.replace(/{city}/g, city.name)}</h3>
          <p class="text-bodytext leading-relaxed">${f.a.replace(/{city}/g, city.name)}</p>
        </div>`
    )
    .join("");

  const otherCities = otherCitiesLinks(service, cities, city.slug);
  const otherServices = otherServicesNav(service.slug);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${metaDescription}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${metaDescription}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#2563EB',
          primaryHover: '#1D4ED8',
          pagebg: '#F8FAFC',
          card: '#FFFFFF',
          darktext: '#0F172A',
          bodytext: '#475569',
          bordercolor: '#E2E8F0',
          whatsapp: '#25D366',
        },
        fontFamily: { sans: ['Inter', 'sans-serif'] },
      },
    },
  };
</script>
<script type="application/ld+json">
${serviceSchema}
</script>
<script type="application/ld+json">
${faqSchema}
</script>
<style>
  body { background-color: #F8FAFC; font-family: 'Inter', sans-serif; }
  .text-gradient { background: linear-gradient(90deg, ${service.accent}, #2563EB); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .glass-nav { backdrop-filter: blur(10px); background: rgba(248,250,252,0.85); }
</style>
</head>
<body class="text-bodytext bg-pagebg">

<nav class="glass-nav fixed top-0 w-full z-50 border-b border-bordercolor">
  <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
    <a href="/" class="text-xl font-extrabold text-darktext">SmartBiz<span class="text-primary">Systems</span></a>
    <div class="hidden md:flex items-center gap-6 text-sm text-bodytext">
      ${otherServices}
      <a href="/pricing" class="hover:text-darktext transition">Pricing</a>
    </div>
    <a href="${waLink(service.whatsappMsg)}" class="bg-whatsapp text-white font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
      <i class="fa-brands fa-whatsapp mr-1"></i> Chat Now
    </a>
  </div>
</nav>

<header class="pt-36 pb-16 px-6 max-w-5xl mx-auto text-center">
  <p class="text-[${service.accent}] font-semibold tracking-wide uppercase text-sm mb-3">${service.keyword} in ${city.name}, Kenya</p>
  <h1 class="text-4xl md:text-5xl font-extrabold text-darktext leading-tight mb-6">
    Help Your ${city.name} Business <span class="text-gradient">${slugTitle(service.metaVerb)}</span>
  </h1>
  <p class="text-lg text-bodytext max-w-3xl mx-auto mb-8">
    SmartBizSystems delivers ${service.keyword.toLowerCase()} built specifically for ${city.name} businesses — priced for SMEs, backed by real Kenyan results, and delivered fast. No bloated retainers. No jargon. Just a system that works.
  </p>
  <div class="flex flex-wrap justify-center gap-4">
    <a href="${waLink(service.whatsappMsg)}" class="bg-whatsapp text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition">
      <i class="fa-brands fa-whatsapp mr-2"></i>Talk on WhatsApp
    </a>
    <a href="/free-audit" class="border border-slate-300 text-darktext font-semibold px-6 py-3 rounded-lg hover:border-primary transition">
      Request Free Audit
    </a>
  </div>
</header>

<section class="max-w-5xl mx-auto px-6 py-14">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-4">Why ${city.name} Businesses Are Falling Behind</h2>
  <p class="text-bodytext leading-relaxed mb-8">
    ${city.name} is ${city.context}. Around ${city.landmark}, competition for local customers is only getting harder — and the businesses winning aren't necessarily the best ones. They're simply the ones that show up first, respond fastest, and follow up consistently. If your ${city.name} business is relying on word of mouth alone, you're leaving growth on the table every single month.
  </p>
  <ul class="space-y-4 mb-4">
    ${painPointsHtml}
  </ul>
</section>

<section class="max-w-5xl mx-auto px-6 py-14 border-t border-bordercolor">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-4">What You Get With SmartBizSystems</h2>
  <p class="text-bodytext leading-relaxed mb-8">
    We don't just deliver the work — we deliver the system that keeps working long after we're done. For ${city.name} businesses, that means a ${service.keyword.toLowerCase()} setup that's built once, documented clearly, and handed over so your team can run it without depending on us for every small change.
  </p>
  <ul class="space-y-4">
    ${featuresHtml}
  </ul>
</section>

<section class="max-w-5xl mx-auto px-6 py-14 border-t border-bordercolor">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-4">Proven Results</h2>
  <p class="text-bodytext leading-relaxed mb-2">
    ${service.proof}
  </p>
  <p class="text-bodytext leading-relaxed">
    We've helped 34+ Kenyan brands scale using systems like this — with an average revenue lift of +30% and 40+ hours saved monthly per client. ${city.name} businesses get the same battle-tested approach, adapted for the local market around ${city.landmark}.
  </p>
</section>

<section class="max-w-5xl mx-auto px-6 py-14 border-t border-bordercolor">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-8 text-center">${service.keyword} Pricing (KES)</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    ${pricingHtml}
  </div>
  <p class="text-center text-sm text-slate-500 mt-6">Prices in Kenyan Shillings. M-Pesa accepted. USD invoicing available on request. Bundle with other services for 20% off.</p>
</section>

<section class="max-w-5xl mx-auto px-6 py-14 border-t border-bordercolor">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-4">How We Work With ${city.name} Businesses</h2>
  <p class="text-bodytext leading-relaxed mb-4">
    Most Nairobi and ${city.name} agencies take weeks just to get started. We move differently. After your free audit, we scope exactly what your business needs — no bloated packages, no unnecessary add-ons — and get to work immediately. Simple builds go live within 7 days; most full projects are completed within 2–4 weeks.
  </p>
  <p class="text-bodytext leading-relaxed">
    Every engagement includes training for your team, so you're never locked into needing us for small changes. You own everything. Zero lock-in. That's the SmartBizSystems way, whether you're based in ${city.name} or anywhere else in Kenya.
  </p>
</section>

<section class="max-w-5xl mx-auto px-6 py-14 border-t border-bordercolor">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-6">Frequently Asked Questions</h2>
  ${faqHtml}
</section>

<section class="max-w-5xl mx-auto px-6 py-14 border-t border-bordercolor">
  <h2 class="text-2xl md:text-3xl font-bold text-darktext mb-4">We Also Serve These Kenyan Cities</h2>
  <p class="text-bodytext leading-relaxed">
    ${service.keyword} for: ${otherCities}, and businesses across Kenya and East Africa.
  </p>
</section>

<section class="max-w-4xl mx-auto px-6 py-20 text-center border-t border-bordercolor">
  <h2 class="text-3xl font-extrabold text-darktext mb-4">Ready to Grow Your ${city.name} Business?</h2>
  <p class="text-bodytext mb-8">Stop guessing. Start growing. Talk to us today — no commitment, no pressure.</p>
  <div class="flex flex-wrap justify-center gap-4">
    <a href="${waLink(service.whatsappMsg)}" class="bg-whatsapp text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition">
      <i class="fa-brands fa-whatsapp mr-2"></i>Talk on WhatsApp
    </a>
    <a href="/free-audit" class="border border-slate-300 text-darktext font-semibold px-6 py-3 rounded-lg hover:border-primary transition">
      Request Free Audit
    </a>
    <a href="${waLink('Hi SmartBiz, I want to book a strategy call')}" class="border border-slate-300 text-darktext font-semibold px-6 py-3 rounded-lg hover:border-primary transition">
      Book a Consultation
    </a>
  </div>
</section>

<footer class="border-t border-bordercolor py-10 px-6 text-center text-slate-500 text-sm bg-white">
  <p>&copy; ${new Date().getFullYear()} SmartBizSystems, Westlands, Nairobi. Built for Kenya.</p>
  <p class="mt-2">${WHATSAPP_DISPLAY} &middot; ${EMAIL}</p>
</footer>

</body>
</html>
`;
}

module.exports = { generatePage };
