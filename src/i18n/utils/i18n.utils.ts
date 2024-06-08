import { Language } from '../i18n.types';
import { i18nKeys } from '../keys';

export const i18nLanguageKeyToTranslation: Record<string, string> = {
  [Language.En]: i18nKeys.language.en,
  [Language.Fr]: i18nKeys.language.fr,
};
