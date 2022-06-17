import { useRouter } from 'next/router'

export const LOCALES = ['en', 'ru', 'uk'] as const
export type Locale = typeof LOCALES[number]
export const [EN, RU, UK] = LOCALES
type UseLocale = { locale: Locale; go: (urn: string) => void; setLocale: (value: Locale) => void }

export default function useLocale(): UseLocale {
  const { asPath, locale: routerLocale = EN, push } = useRouter()
  const locale = !(LOCALES as ReadonlyArray<string>).includes(routerLocale) ? EN : (routerLocale as Locale)

  const go = (urn: string) => push(urn, urn, { locale })

  const setLocale = (value: Locale) => {
    document.cookie = `NEXT_LOCALE=${value}`
    push(asPath, asPath, { locale: value })
  }

  return { locale, go, setLocale }
}
