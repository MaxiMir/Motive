import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { ClientDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Layout from 'layout'
import MainView from 'views/MainView'

const i18n = {
  en: {
    title: 'A social network for achieving goals',
  },
  ru: {
    title: 'Социальная сеть для достижения целей',
  },
}

export default function MainPage(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <Layout title={title}>
      <MainView locale={locale} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const client = session?.user as ClientDto | undefined

  if (!client) {
    return {
      props: {
        session,
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: client.nickname,
      basePath: false,
    },
  }
}
