import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { AxiosRequestHeaders } from 'axios'
import { RATING } from 'route'
import PageService from 'services/PageService'
import Layout from 'layout'
import RatingView from './components/RatingView'
import useRatingPage from './hook'

export default function RatingPage() {
  const { formatMessage } = useIntl()
  const { query } = useRouter()
  const { data } = useRatingPage()
  const tab = !query.tab ? 0 : +query.tab
  const title = formatMessage({ id: `page.rating.title.tab-${tab}` })
  const description = formatMessage({ id: 'page.rating.description' })

  return (
    <Layout title={title} description={description}>
      {data?.content && <RatingView {...data.content} tab={tab} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(RATING, () => PageService.get(RATING, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
