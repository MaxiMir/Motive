export const getLocaleHref = (locale?: string) => {
  if (!locale) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  return [process.env.NEXT_PUBLIC_APP_URL, locale].join('/')
}
