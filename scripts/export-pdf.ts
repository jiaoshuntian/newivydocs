import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'ivorysql-docs-v5.pdf');

async function getOrderedUrls(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/api/pdf-pages`);
  if (!res.ok) throw new Error(`Failed to fetch page list: ${res.status}`);
  return res.json() as Promise<string[]>;
}

async function main() {
  console.log('Fetching page list...');
  const urls = await getOrderedUrls();
  console.log(`Found ${urls.length} pages to export.`);

  const browser = await puppeteer.launch({ headless: true });
  const pdfBuffers: Buffer[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const fullUrl = BASE_URL + url;
    process.stdout.write(`[${i + 1}/${urls.length}] ${url} ... `);

    const browserPage = await browser.newPage();
    let succeeded = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await browserPage.goto(fullUrl, { waitUntil: 'load', timeout: 60_000 });
        succeeded = true;
        break;
      } catch {
        if (attempt < 3) process.stdout.write(`retry ${attempt}... `);
      }
    }
    if (!succeeded) {
      console.log('SKIPPED (timeout)');
      await browserPage.close();
      continue;
    }

    const buf = await browserPage.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    });

    pdfBuffers.push(Buffer.from(buf));
    await browserPage.close();
    console.log('done');
  }

  await browser.close();

  console.log('\nMerging PDFs...');
  const merged = await PDFDocument.create();
  for (const buf of pdfBuffers) {
    const doc = await PDFDocument.load(buf);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }

  const mergedBytes = await merged.save();
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, mergedBytes);

  const sizeKb = Math.round(mergedBytes.byteLength / 1024);
  console.log(`\nSaved: ${OUTPUT_PATH} (${sizeKb} KB, ${merged.getPageCount()} pages)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
