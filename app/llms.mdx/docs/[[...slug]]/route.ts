import { getLLMTextV5, getPageMarkdownUrlV5, sourceV5 } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  const page = sourceV5.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await getLLMTextV5(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return sourceV5.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageMarkdownUrlV5(page).segments,
  }));
}
