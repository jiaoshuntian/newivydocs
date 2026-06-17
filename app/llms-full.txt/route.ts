import { getLLMTextV5, sourceV5 } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const scan = sourceV5.getPages().map(getLLMTextV5);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
