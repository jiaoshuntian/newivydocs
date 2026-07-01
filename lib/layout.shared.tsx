import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { uiTranslations } from 'fumadocs-ui/i18n';
import { zhCN } from '@fumadocs/language/zh-cn';
import { i18n } from './i18n';
import { appName, gitConfig } from './shared';

export const translations = i18n.translations().extend(uiTranslations()).preset('cn', zhCN());

const navLinks = {
  en: [
    { text: 'Getting Started', slug: 'getting-started' },
    { text: 'Deploy', slug: 'deploy' },
    { text: 'Cloud Service', slug: 'cloud-service' },
    { text: 'Oracle Compatibility', slug: 'oracle-compatibility' },
    { text: 'Ecosystem', slug: 'ecosystem' },
    { text: 'Developers', slug: 'developers' },
    { text: 'Reference', slug: 'reference' },
  ],
  cn: [
    { text: '快速开始', slug: 'getting-started' },
    { text: '部署', slug: 'deploy' },
    { text: '云服务', slug: 'cloud-service' },
    { text: 'Oracle 兼容性', slug: 'oracle-compatibility' },
    { text: '生态系统', slug: 'ecosystem' },
    { text: '开发者', slug: 'developers' },
    { text: '参考', slug: 'reference' },
  ],
};

export function baseOptions(locale: string = i18n.defaultLanguage): BaseLayoutProps {
  const localePrefix = locale === i18n.defaultLanguage ? '' : `/${locale}`;
  const links = navLinks[locale as keyof typeof navLinks] ?? navLinks.en;

  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: links.map(({ text, slug }) => ({
      on: 'nav' as const,
      text,
      url: `${localePrefix}/docs/v5/${slug}`,
      active: 'nested-url' as const,
    })),
  };
}
