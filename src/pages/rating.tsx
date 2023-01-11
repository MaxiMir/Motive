import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import DeviceDetector from 'node-device-detector'
import { Route } from '@href'
import RatingModule, { useRatingPage, useMetaTags } from '@modules/rating'
import Page, { PageService } from '@features/page'
import { getSession } from 'next-auth/react'

function RatingPage() {
  const { query } = useRouter()
  const { data } = useRatingPage()
  const tab = !query.tab ? 0 : +query.tab
  const metaTags = useMetaTags(tab)

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      {data && <RatingModule {...data} tab={tab} />}
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
