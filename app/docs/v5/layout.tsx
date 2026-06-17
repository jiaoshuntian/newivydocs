import { sourceV5 } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs/v5'>) {
  return (
    <DocsLayout tree={sourceV5.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
