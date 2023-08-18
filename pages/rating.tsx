import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import { RatingPage } from 'pages/rating'
import { useRatingPage, useMeta } from 'entities/page'
import { getRatingPage } from 'shared/api'
import { Route } from 'shared/config'

function RatingRoute() {
  const { data } = useRatingPage()
  const meta = useMeta('rating')

  return (
    <Layout title={meta.title} description={meta.description}>
      {data && <RatingPage users={data} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const session = await getSession(ctx)
  const device = detector.detect(headers['user-agent'] || '')
  await queryClient.prefetchQuery(['page', Route.Rating], () => getRatingPage({ headers }))

  return {
    props: {
      session,
      device,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default RatingRoute
