import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as pdfParse from "pdf-parse";

const pdf = (pdfParse as any).default ?? pdfParse;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const output = `// Auto-generated from novacart_company_knowledge_base.pdf — do not edit manually
// Run: npx ts-node scripts/extract-pdf.ts to regenerate

export const NOVACART_KNOWLEDGE = ${JSON.stringify(text)};
`;

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log("✓ Knowledge base written to:", outputPath);
  console.log(`✓ Extracted ${text.length} characters from ${data.numpages} pages`);
}

main().catch(console.error);
