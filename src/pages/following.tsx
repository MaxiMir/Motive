import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { Route } from '@href'
import useMetaTags from '@hooks/useMetaTags'
import PageFeature, { PageService } from '@features/page'
import FollowingFeature, { useFollowingPage } from '@features/following'

function FollowingPage() {
  const { data } = useFollowingPage()
  const metaTags = useMetaTags('following')

  return (
    <PageFeature title={metaTags.title} description={metaTags.description}>
      {data && <FollowingFeature following={data.following} />}
    </PageFeature>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  await queryClient.prefetchQuery(Route.Following, () => PageService.getFollowing({ headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FollowingPage
