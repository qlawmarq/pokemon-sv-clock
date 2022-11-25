import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en';
import ja from './ja';

const i18n = new I18n();
i18n.enableFallback = true;
i18n.translations = { en, ja };
i18n.locale = Localization.locale;

export default i18n;
export { langs } from './langs';
