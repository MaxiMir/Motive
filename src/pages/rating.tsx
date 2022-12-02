import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { AxiosRequestHeaders } from 'axios'
import { Route } from '@href'
import PageService from '@services/page'
import RatingModule, { useRatingPage, useMetaTags } from '@modules/rating'
import Layout from '@layout'

function RatingPage() {
  const { query } = useRouter()
  const { data } = useRatingPage()
  const tab = !query.tab ? 0 : +query.tab
  const metaTags = useMetaTags(tab)

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
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

export default RatingPage
