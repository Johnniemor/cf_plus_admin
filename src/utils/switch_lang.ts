import i18n, { LANG_KEY } from '@/lang/i18n';

export const switchLanguage = () => {
  const newLang = i18n.language === 'la' ? 'en' : 'la';
  console.log('newLang', newLang);
  i18n.changeLanguage(newLang).then(() => {
    localStorage.setItem(LANG_KEY, newLang);
  });
};
