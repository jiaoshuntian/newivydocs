import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

export const { GET } = createFromSource(source, {
  // Per-locale config, not a top-level `language` — Orama throws if a
  // language string and a custom tokenizer are both set on the same index.
  // https://docs.orama.com/docs/orama-js/supported-languages
  localeMap: {
    en: { language: 'english' },
    // Orama's built-in stemmers have no Chinese entry — its default
    // tokenizer splits on whitespace/Latin word boundaries, which is
    // useless for a language with no spaces between words.
    // @orama/tokenizers/mandarin uses Intl.Segmenter for real word
    // segmentation instead.
    cn: { tokenizer: createTokenizer() },
  },
});
