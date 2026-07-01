import { NextRequest, NextResponse, type NextFetchEvent } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { docsContentRoute, docsRoute } from '@/lib/shared';

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

const i18nMiddleware = createI18nMiddleware(i18n);

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  // Markdown content negotiation is English-only for now (see
  // app/llms.mdx/docs/[[...slug]]/route.ts) and only ever matches the bare
  // `/docs/...` path (no locale prefix), so it must run before the i18n
  // middleware would otherwise rewrite that same path to `/en/docs/...`.
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return i18nMiddleware(request, event);
}

export const config = {
  // Skip API/route-handler-only paths (no [lang] segment) and static assets.
  matcher: [
    '/((?!api|og|llms\\.txt|llms-full\\.txt|llms\\.mdx|_next/static|_next/image|favicon\\.ico|.*\\..*).*)',
  ],
};
