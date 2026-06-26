import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { on: 'nav', text: 'Getting Started', url: '/docs/v5/getting-started', active: 'nested-url' },
      { on: 'nav', text: 'Deploy', url: '/docs/v5/deploy', active: 'nested-url' },
      { on: 'nav', text: 'Cloud Service', url: '/docs/v5/cloud-service', active: 'nested-url' },
      { on: 'nav', text: 'Oracle Compatibility', url: '/docs/v5/oracle-compatibility', active: 'nested-url' },
      { on: 'nav', text: 'Ecosystem', url: '/docs/v5/ecosystem', active: 'nested-url' },
      { on: 'nav', text: 'Developers', url: '/docs/v5/developers', active: 'nested-url' },
      { on: 'nav', text: 'Reference', url: '/docs/v5/reference', active: 'nested-url' },
    ],
  };
}
