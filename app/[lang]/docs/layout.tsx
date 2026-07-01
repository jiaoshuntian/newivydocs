import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { getSidebarTabs } from 'fumadocs-ui/components/sidebar/tabs';
import { baseOptions } from '@/lib/layout.shared';
import { FileDown } from 'lucide-react';

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;
  const tree = source.getPageTree(lang);

  const docsLinks = [
    ...baseOptions(lang).links!,
    {
      type: 'icon' as const,
      on: 'menu' as const,
      url: '/ivorysql-docs-v5.pdf',
      label: 'Download PDF (v5)',
      text: 'Download PDF (v5)',
      icon: <FileDown className="size-full" />,
      external: true,
    },
  ];

  return (
    <DocsLayout
      tree={tree}
      {...baseOptions(lang)}
      links={docsLinks}
      // getLayoutTabs (the DocsLayout default) matches active tabs against a
      // folder's `children` only, missing its own index page (e.g. /docs/v5).
      // getSidebarTabs matches against the folder's full URL set instead, so
      // the toggle stays visible after switching to a version's overview page.
      tabs={getSidebarTabs(tree)}
    >
      {children}
    </DocsLayout>
  );
}
