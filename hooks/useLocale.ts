import { useRouter } from 'next/router'

export const LOCALES = ['en', 'ru', 'uk'] as const
export const [EN, RU, UK] = LOCALES
export const LOCALE_MAP = { [EN]: 'en_US', [RU]: 'ru_RU', [UK]: 'Uk_UA' }

export type Locale = typeof LOCALES[number]

interface UseLocale {
  locale: Locale
  go: (url: string) => void
  setLocale: (value: Locale) => void
}

export default function useLocale(): UseLocale {
  const { asPath, locale: routerLocale = EN, push } = useRouter()
  const locale = !(LOCALES as ReadonlyArray<string>).includes(routerLocale) ? EN : (routerLocale as Locale)

  const go = (url: string) => push(url, url, { locale })

  const setLocale = (value: Locale) => {
    document.cookie = `NEXT_LOCALE=${value}`
    push(asPath, asPath, { locale: value })
  }

  return { locale, go, setLocale }
}
