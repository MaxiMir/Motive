import { useRouter } from 'next/router'
import { Locale } from '@modules/locale/types'

export const useSetLocale = () => {
  const { asPath, push } = useRouter()

  return (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}`
    push(asPath, asPath, { locale })
  }
}
