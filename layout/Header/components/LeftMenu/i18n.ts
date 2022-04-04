export default {
  en: {
    ariaLabel: 'Open menu',
    news: 'News',
    features: 'New Features',
    contact: 'Contact us',
    language: 'Language: En',
    logOut: 'Sign out',
    getTheme(isLight: boolean): string {
      return `Dark theme: ${isLight ? 'Off' : 'On'}`
    },
  },
  ru: {
    ariaLabel: 'Открыть меню',
    news: 'Новости',
    features: 'Что нового',
    contact: 'Контакты',
    language: 'Язык: Ру',
    logOut: 'Выйти',
    getTheme(isLight: boolean): string {
      return `Темная тема: ${isLight ? 'Выкл' : 'Вкл'}`
    },
  },
}
