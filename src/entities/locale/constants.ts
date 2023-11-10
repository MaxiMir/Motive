import { Locale } from 'entities/locale/types'

export const LANGUAGES = [
  { primary: 'EN', name: 'English', icon: 'en', emoji: '🇺🇸', value: Locale.En },
  { primary: 'РУ', name: 'Русский', icon: 'ru', emoji: '🇷🇺', value: Locale.Ru },
  { primary: 'УК', name: 'Український', icon: 'uk', emoji: '🇺🇦', value: Locale.Uk },
  { primary: '中国', name: '中国', icon: 'zh', emoji: '🇨🇳', value: Locale.Zh },
] as const
