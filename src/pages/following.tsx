import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { AxiosRequestHeaders } from 'axios'
import { Route } from '@href'
import useMetaTags from '@hooks/useMetaTags'
import PageService from '@services/page'
import FollowingModule, { useFollowingPage } from '@modules/following'
import Layout from '@layout'

function FollowingPage() {
  const { data } = useFollowingPage()
  const metaTags = useMetaTags('following')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      {data?.content && <FollowingModule users={data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(Route.Following, () => PageService.get(Route.Following, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FollowingPage
