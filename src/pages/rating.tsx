import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import RatingView from '@views/rating'
import Page, { PageService, useRatingPage } from '@modules/page'
import { useRatingTab, useRatingMeta } from '@modules/rating'
import { Route } from '@href'

function RatingPage() {
  const tab = useRatingTab()
  const meta = useRatingMeta(tab)
  const { data } = useRatingPage()

  return (
    <Page title={meta.title} description={meta.description}>
      {data && <RatingView {...data} tab={tab} />}
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const session = await getSession(ctx)
  const { device } = detector.detect(headers['user-agent'] || '')

  await queryClient.prefetchQuery(['page', Route.Rating], () => PageService.getRating({ headers }))

  return {
    props: {
      session,
      device,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default RatingPage
