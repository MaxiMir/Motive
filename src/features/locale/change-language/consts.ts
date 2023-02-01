import { Locale } from 'entities/locale'

export const LANGUAGES = [
  { primary: 'EN', icon: 'en', emoji: '🇺🇸', value: Locale.En },
  { primary: 'РУ', icon: 'ru', emoji: '🇷🇺', value: Locale.Ru },
  { primary: 'УК', icon: 'uk', emoji: '🇺🇦', value: Locale.Uk },
  { primary: '中国', icon: 'zh', emoji: '🇨🇳', value: Locale.Zh },
] as const
