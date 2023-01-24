import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import Layout from '@app/ui/Layout'
import FollowingPage from '@pages/following'
import { getFollowingPage, useFollowingPage } from '@entities/pages'
import useMetaTags from '@hooks/useMetaTags'
import { Route } from '@shared/consts/routes'

function FollowingRoute() {
  const { data } = useFollowingPage()
  const metaTags = useMetaTags('following')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      {data && <FollowingPage following={data.following} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)

  await queryClient.prefetchQuery(['page', Route.Following], () => getFollowingPage({ headers }))

  return {
    props: {
      session,
      device,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FollowingRoute
