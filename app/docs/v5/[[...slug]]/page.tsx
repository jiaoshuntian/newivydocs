import { getPageImageV5, getPageMarkdownUrlV5, sourceV5 } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { FlaskConical, LifeBuoy, Pencil } from 'lucide-react';
import Link from 'next/link';
import { Feedback } from '@/components/feedback/client';
import { onPageFeedbackAction } from '@/lib/feedback';

export default async function Page(props: PageProps<'/docs/v5/[[...slug]]'>) {
  const params = await props.params;
  const page = sourceV5.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrlV5(page).url;
  const githubEditUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/v5/${page.path}`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={githubEditUrl}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(sourceV5, page),
          })}
        />
        <Feedback onSendAction={onPageFeedbackAction} />
        <div className="mt-4 flex flex-col gap-2.5 print:hidden">
          <a
            href={githubEditUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <Pencil className="size-3.5" />
            Edit this page on GitHub
          </a>
          <div className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
            <LifeBuoy className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Need some help?</span>
            <a
              href="https://github.com/IvorySQL/IvorySQL/issues/new"
              className="text-fd-primary hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              Submit a GitHub Issue
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
            <FlaskConical className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Latest product updates?</span>
            <Link href="/docs/v5/getting-started/release-notes" className="text-fd-primary hover:underline">
              View Release Notes
            </Link>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return sourceV5.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/v5/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = sourceV5.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageV5(page).url,
    },
  };
}
