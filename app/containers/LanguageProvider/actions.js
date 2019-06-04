/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './constants';

export function changeLocale(languageLocale) {
  console.log('I am changed')
  
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
