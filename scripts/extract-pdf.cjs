const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

async function main() {
  const pdfPath = path.resolve(__dirname, "../../company data/novacart_company_knowledge_base.pdf");
  const outputPath = path.resolve(__dirname, "../src/data/novacart-knowledge.ts");

  console.log("Reading PDF from:", pdfPath);

  const buffer = fs.readFileSync(pdfPath);
  const data = await pdf(buffer);

  const text = data.text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const output = `// Auto-generated from novacart_company_knowledge_base.pdf\n// Run: node scripts/extract-pdf.cjs to regenerate\n\nexport const NOVACART_KNOWLEDGE = ${JSON.stringify(text)};\n`;

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log("Done! Written to:", outputPath);
  console.log("Extracted", text.length, "characters from", data.numpages, "pages");
}

main().catch(console.error);
