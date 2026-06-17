import { sourceV5 } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(sourceV5, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
