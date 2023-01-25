import { useRouter } from 'next/router'
import { Locale } from '@entities/locale/model/types'

export const useSetLocale = () => {
  const { asPath, push } = useRouter()

  return (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}`
    push(asPath, asPath, { locale })
  }
}
