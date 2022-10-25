import { useRouter } from 'next/router'

export const LOCALES = ['en', 'ru', 'uk']
export const [EN, RU, UK] = LOCALES
export const LOCALE_MAP = { [EN]: 'en_US', [RU]: 'ru_RU', [UK]: 'Uk_UA' }

export type Locale = typeof LOCALES[number]

export const useSetLocale = () => {
  const { asPath, push } = useRouter()

  return (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}`
    push(asPath, asPath, { locale })
  }
}
