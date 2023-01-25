import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { dehydrate, QueryClient } from 'react-query'
import Layout from '@app/ui/Layout'
import { getRatingPage, useRatingTab, useRatingMeta, useRatingPage } from '@entities/pages'
import RatingPage from '@pages/rating'
import { Route } from '@shared/consts'

function RatingRoute() {
  const tab = useRatingTab()
  const meta = useRatingMeta(tab)
  const { data } = useRatingPage()

  return (
    <Layout title={meta.title} description={meta.description}>
      {data && <RatingPage {...data} tab={tab} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const session = await getSession(ctx)
  const { device } = detector.detect(headers['user-agent'] || '')
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
