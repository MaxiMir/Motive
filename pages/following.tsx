import { parse } from 'express-useragent'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import { FollowingPage } from 'pages/following'
import { useFollowingPage, useMeta } from 'entities/page'
import { getFollowingPage } from 'shared/api'
import { Route } from 'shared/config'

function FollowingRoute() {
  const { data } = useFollowingPage()
  const meta = useMeta('following')

  return (
    <Layout title={meta.title} description={meta.description}>
      {data && <FollowingPage following={data.following} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const userDevice = parse(headers['user-agent'] || '')
  await queryClient.prefetchQuery(['page', Route.Following], () => getFollowingPage({ headers }))

  return {
    props: {
      userDevice,
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FollowingRoute
