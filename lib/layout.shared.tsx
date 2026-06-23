import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { url: '/docs/v5/getting-started', text: 'Getting Started' },
      { url: '/docs/v5/deploy', text: 'Deploy' },
      { url: '/docs/v5/cloud-service', text: 'Cloud Service' },
      { url: '/docs/v5/oracle-compatibility', text: 'Oracle Compatibility' },
      { url: '/docs/v5/ecosystem', text: 'Ecosystem' },
    ],
  };
}
