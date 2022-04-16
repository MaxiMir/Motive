import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { ClientDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Layout from 'layout'
import MainView from 'views/MainView'

const i18n = {
  en: {
    title: 'A social media for achieving goals',
    description: 'Create your own goals, share your accomplishments, and go to your goals with others 🥷!',
  },
  ru: {
    title: 'Социальная сеть для достижения целей',
    description: 'Создавайте свои цели, делитесь своими достижениями, а так же идите к цели со другими 🥷!',
  },
}

export default function MainPage(): JSX.Element {
  const { locale } = useLocale()
  const { title, description } = i18n[locale]

  return (
    <Layout title={title} description={description}>
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
