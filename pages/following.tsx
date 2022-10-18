import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { AxiosRequestHeaders } from 'axios'
import { FOLLOWING } from 'route'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import Layout from 'layout'
import FollowingView from 'views/FollowingView'
import useFollowingPage from 'views/FollowingView/hook'

const i18n = {
  en: {
    title: 'Following',
    description: 'List of users you are interested in 🥷',
  },
  ru: {
    title: 'Подписки',
    description: 'Список интересных Вам пользователей 🥷',
  },
  uk: {
    title: 'Підписки',
    description: 'Список цікавих користувачів 🥷',
  },
}

export default function FollowingPage() {
  const { locale } = useLocale()
  const { title, description } = i18n[locale]
  const { data } = useFollowingPage()

  return (
    <Layout title={title} description={description}>
      {data?.content && <FollowingView users={data.content} locale={locale} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(FOLLOWING, () => PageService.get(FOLLOWING, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
