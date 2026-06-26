import { sourceV5 } from '@/lib/source';
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

export function GET() {
  const tree = sourceV5.getPageTree();
  const urls = collectUrls(tree.children);
  return Response.json(urls);
}
