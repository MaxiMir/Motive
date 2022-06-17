import Layout from 'layout'
import useLocale from 'hooks/useLocale'

const i18n = {
  en: {
    title: '500: Sorry, something went wrong...',
  },
  ru: {
    title: '500: Что-то пошло не так...',
  },
  uk: {
    title: '500: Щось пішло не так...',
  },
}

export default function Page500() {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return <Layout title={title} statusCode={500} />
}
