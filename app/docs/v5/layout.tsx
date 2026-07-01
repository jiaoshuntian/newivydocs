import { sourceV5 } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { FileDown } from 'lucide-react';

const v5Links = [
  ...baseOptions().links!,
  {
    type: 'icon' as const,
    on: 'menu' as const,
    url: '/ivorysql-docs-v5.pdf',
    label: 'Download PDF',
    text: 'Download PDF',
    icon: <FileDown className="size-full" />,
    external: true,
  },
];

export default function Layout({ children }: LayoutProps<'/docs/v5'>) {
  return (
    <DocsLayout
      tree={sourceV5.getPageTree()}
      {...baseOptions()}
      links={v5Links}
    >
      {children}
    </DocsLayout>
  );
}
