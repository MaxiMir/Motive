import { Locale } from 'entities/locale/types'

function getLocaleHref(asPath: string, locale?: Locale) {
  const localePath = !locale ? '' : `/${locale}`

  return [process.env.NEXT_PUBLIC_APP_URL, localePath, asPath].join('')
}

export function getLocaleHrefList(asPath: string): Record<string, string> {
  return {
    [Locale.En]: getLocaleHref(asPath, Locale.En),
    [Locale.Ru]: getLocaleHref(asPath, Locale.Ru),
    [Locale.Uk]: getLocaleHref(asPath, Locale.Uk),
    [Locale.Zh]: getLocaleHref(asPath, Locale.Zh),
  }
}
