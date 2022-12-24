import { Locale } from '@features/locale/types'

type GetLocaleHref = (asPath: string, locale?: Locale) => string

const getLocaleHref: GetLocaleHref = (asPath, locale) => {
  const localePath = !locale ? '' : `/${locale}`

  return [process.env.NEXT_PUBLIC_APP_URL, localePath, asPath].join('')
}

export const getLocaleHrefList = (asPath: string): Record<string, string> => ({
  [Locale.En]: getLocaleHref(asPath),
  [Locale.Ru]: getLocaleHref(asPath, Locale.Ru),
  [Locale.Uk]: getLocaleHref(asPath, Locale.Uk),
  [Locale.Zh]: getLocaleHref(asPath, Locale.Zh),
})
