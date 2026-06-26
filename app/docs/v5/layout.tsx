import { sourceV5 } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { FileDown } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/docs/v5'>) {
  return (
    <DocsLayout
      tree={sourceV5.getPageTree()}
      {...baseOptions()}
      sidebar={{
        banner: (
          <a
            href="/ivorysql-docs-v5.pdf"
            download
            className="flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <FileDown className="size-3.5 shrink-0" />
            Download PDF
          </a>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
