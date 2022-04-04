import { useRouter } from 'next/router'

export type Locale = 'en' | 'ru'

type UseLocale = { locale: Locale; jump: (urn: string) => void; next: () => void }

export default function useLocale(): UseLocale {
  const { asPath, locale: nextLocale, push } = useRouter()
  const locale = nextLocale !== 'ru' ? 'en' : 'ru'

  const jump = (urn: string) => push(urn, urn, { locale })

  // TODO to modal
  const next = () => {
    const nextState = locale === 'en' ? 'ru' : 'en'

    document.cookie = `NEXT_LOCALE=${nextState}`
    push(asPath, asPath, { locale: nextState })
  }

  return { locale, jump, next }
}
