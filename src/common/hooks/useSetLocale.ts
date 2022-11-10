import { useRouter } from 'next/router'

export enum Locale {
  En = 'en',
  Ru = 'ru',
  Uk = 'uk',
}

export const useSetLocale = () => {
  const { asPath, push } = useRouter()

  return (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}`
    push(asPath, asPath, { locale })
  }
}
