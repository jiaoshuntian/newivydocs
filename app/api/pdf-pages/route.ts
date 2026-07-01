import { source } from '@/lib/source';
import type { Node } from 'fumadocs-core/page-tree';

function collectUrls(nodes: Node[]): string[] {
  const urls: string[] = [];
  for (const node of nodes) {
    if (node.type === 'page') {
      urls.push(node.url);
    } else if (node.type === 'folder') {
      if (node.index) urls.push(node.index.url);
      urls.push(...collectUrls(node.children));
    }
  }
  return urls;
}

// PDF export only covers the v5 (latest) version.
export function GET() {
  const tree = source.getPageTree();
  const urls = collectUrls(tree.children).filter((url) => url.startsWith('/docs/v5'));
  return Response.json(urls);
}
