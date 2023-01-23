import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import FollowingView from '@views/following'
import Page, { PageService, useFollowingPage } from '@features/page'
import useMetaTags from '@hooks/useMetaTags'
import { Route } from '@href'

function FollowingPage() {
  const { data } = useFollowingPage()
  const metaTags = useMetaTags('following')

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      {data && <FollowingView following={data.following} />}
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)

  await queryClient.prefetchQuery(['page', Route.Following], () =>
    PageService.getFollowing({ headers }),
  )

  return {
    props: {
      session,
      device,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FollowingPage
