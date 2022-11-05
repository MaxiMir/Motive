import { Locale, EN, RU, UK } from '@hooks/useSetLocale'

const getLocaleHref = (asPath: string, locale?: string) => {
  const localePath = !locale ? '' : `/${locale}`

  return [process.env.NEXT_PUBLIC_APP_URL, localePath, asPath].join('')
}

export const getLocaleHrefList = (asPath: string): Record<Locale, string> => ({
  [EN]: getLocaleHref(asPath),
  [RU]: getLocaleHref(asPath, RU),
  [UK]: getLocaleHref(asPath, UK),
})
