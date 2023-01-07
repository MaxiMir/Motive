import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { Route } from '@href'
import FollowingModule, { useFollowingPage } from '@modules/following'
import Page, { PageService } from '@features/page'
import useMetaTags from '@hooks/useMetaTags'

function FollowingPage() {
  const { data } = useFollowingPage()
  const metaTags = useMetaTags('following')

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      {data && <FollowingModule following={data.following} />}
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  await queryClient.prefetchQuery(['page', Route.Following], () =>
    PageService.getFollowing({ headers }),
  )

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FollowingPage
