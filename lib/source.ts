import { docsV5, docsV4 } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRouteV5, docsContentRouteV4, docsImageRouteV5, docsImageRouteV4, docsRouteV5, docsRouteV4 } from './shared';

// --- v5 source (active version) ---

export const sourceV5 = loader({
  baseUrl: docsRouteV5,
  source: docsV5.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImageV5(page: (typeof sourceV5)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRouteV5}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrlV5(page: (typeof sourceV5)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRouteV5}/${segments.join('/')}`,
  };
}

export async function getLLMTextV5(page: (typeof sourceV5)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// --- v4 source (placeholder, redirects to v5) ---
// These helpers are reserved for Phase 2 when v4 ships real content.
// Currently all /docs/v4/* routes redirect to /docs/v5.

export const sourceV4 = loader({
  baseUrl: docsRouteV4,
  source: docsV4.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImageV4(page: (typeof sourceV4)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRouteV4}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrlV4(page: (typeof sourceV4)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRouteV4}/${segments.join('/')}`,
  };
}

export async function getLLMTextV4(page: (typeof sourceV4)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
