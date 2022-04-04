import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import useLocale from 'hooks/useLocale'
import TopOfTheDayView from 'views/TopOfTheDayView'

const i18n = {
  en: {
    title: 'Top of the day',
  },
  ru: {
    title: 'Топ дня',
  },
}

export default function TopOfTheDay(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <Layout title={title}>
      <TopOfTheDayView locale={locale} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}
