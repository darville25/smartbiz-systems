// main.js
// SmartBizSystems pSEO Generator
// Generates flat HTML pages for: SEO & Schema Markup, Paid Advertising, Email Marketing
// Usage:  node main.js
// Output: ./output/<service-slug>/<city-slug>.html  (copy these folders into your site repo root)

const fs = require("fs");
const path = require("path");

const cities = require("./data/cities");
const services = require("./data/services");
const { generatePage } = require("./templates/pageTemplate");

const OUTPUT_DIR = path.join(__dirname, "output");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateAll() {
  let count = 0;
  const manifest = [];

  services.forEach((service) => {
    const serviceDir = path.join(OUTPUT_DIR, service.slug);
    ensureDir(serviceDir);

    cities.forEach((city) => {
      const html = generatePage(service, city, cities);
      const filePath = path.join(serviceDir, `${city.slug}.html`);
      fs.writeFileSync(filePath, html, "utf8");
      manifest.push(`/${service.slug}/${city.slug}`);
      count++;
    });

    console.log(`✔ ${service.name}: ${cities.length} city pages written to /output/${service.slug}/`);
  });

  // Write a manifest file listing every generated URL — useful for sitemap.xml and internal linking
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "manifest.txt"),
    manifest.join("\n"),
    "utf8"
  );

  console.log(`\nDone. ${count} pages generated across ${services.length} services x ${cities.length} cities.`);
  console.log(`Manifest written to /output/manifest.txt (use it to update sitemap.xml).`);
}

generateAll();
