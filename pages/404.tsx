import Layout from 'layout'
import useLocale from 'hooks/useLocale'

const i18n = {
  en: {
    title: '404: This page could not be found',
  },
  ru: {
    title: '404: Страница не найдена',
  },
}

export default function Page404(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return <Layout title={title} statusCode={404} />
}
