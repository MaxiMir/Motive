import { useRouter } from 'next/router'

export function useSetLocale() {
  const { asPath, push } = useRouter()

  return async (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale};maxage=${1000 * 60 * 60 * 24 * 7};path=/`
    push(asPath, asPath, { locale })
  }
}
