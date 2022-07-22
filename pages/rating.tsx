import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { AxiosRequestHeaders } from 'axios'
import { PageProps, PossiblePageError } from 'dto'
import { RATING } from 'route'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/RatingView'
import useRatingPage from 'views/RatingView/hook'

const i18n = {
  en: {
    title: 'Rating users',
    description: 'Rating the most motivating, creative, and supportive users 🥷',
  },
  ru: {
    title: 'Рейтинг пользователей',
    description: 'Рейтинг самых мотивирующих, творческих и поддерживающих пользователей 🥷',
  },
  uk: {
    title: 'Рейтинг користувачів',
    description: 'Рейтинг найбільш мотивуючих, творчих та підтримуючих користувачів 🥷',
  },
}

export default function RatingPage({ statusCode }: PageProps) {
  const { locale } = useLocale()
  const { data } = useRatingPage()
  const { title, description } = i18n[locale]

  return (
    <Layout title={title} description={description} statusCode={statusCode}>
      {data?.content && <Rating {...data.content} locale={locale} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(RATING, () => PageService.get(RATING, { headers }))
  const state = queryClient.getQueryState<PossiblePageError>(RATING)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      session,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
