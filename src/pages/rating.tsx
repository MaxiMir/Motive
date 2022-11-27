import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { AxiosRequestHeaders } from 'axios'
import { Route } from '@href'
import { PageService } from '@services/page'
import Layout from '@layout'
import RatingModule, { useRatingPage } from '@modules/rating'

export default function RatingPage() {
  const { formatMessage } = useIntl()
  const { query } = useRouter()
  const { data } = useRatingPage()
  const tab = !query.tab ? 0 : +query.tab
  const title = formatMessage({ id: `page.rating.title.tab-${tab}` })
  const description = formatMessage({ id: 'page.rating.description' })

  return (
    <Layout title={title} description={description}>
      {data?.content && <RatingModule {...data.content} tab={tab} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(Route.Rating, () => PageService.get(Route.Rating, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
