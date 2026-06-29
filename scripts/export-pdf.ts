import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'ivorysql-docs-v5.pdf');
const CONCURRENCY = 8;

async function getOrderedUrls(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/api/pdf-pages`);
  if (!res.ok) throw new Error(`Failed to fetch page list: ${res.status}`);
  return res.json() as Promise<string[]>;
}

async function exportPage(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  url: string,
  index: number,
  total: number,
): Promise<Buffer | null> {
  const fullUrl = BASE_URL + url;
  process.stdout.write(`[${index + 1}/${total}] ${url} ... `);

  const browserPage = await browser.newPage();
  try {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await browserPage.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 60_000 });
        break;
      } catch {
        if (attempt === 3) {
          console.log('SKIPPED (timeout)');
          return null;
        }
        process.stdout.write(`retry ${attempt}... `);
      }
    }

    const buf = await browserPage.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    });

    console.log('done');
    return Buffer.from(buf);
  } finally {
    await browserPage.close();
  }
}

async function main() {
  console.log('Fetching page list...');
  const urls = await getOrderedUrls();
  console.log(`Found ${urls.length} pages to export (concurrency: ${CONCURRENCY}).\n`);

  const browser = await puppeteer.launch({ headless: true });

  // Process in parallel batches to preserve page order
  const results: (Buffer | null)[] = new Array(urls.length).fill(null);
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const buffers = await Promise.all(
      batch.map((url, j) => exportPage(browser, url, i + j, urls.length)),
    );
    buffers.forEach((buf, j) => { results[i + j] = buf; });
  }

  await browser.close();

  console.log('\nMerging PDFs...');
  const merged = await PDFDocument.create();
  for (const buf of results) {
    if (!buf) continue;
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
