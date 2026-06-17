import { sourceV5 } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

export function GET() {
  return new Response(llms(sourceV5).index());
}
