import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import FeedView from '@views/feed'
import Page from '@modules/page'
import useMetaTags from '@hooks/useMetaTags'

function FeedPage() {
  const metaTags = useMetaTags('feed')

  return (
    <Page title={metaTags.title}>
      <FeedView />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)

  return {
    props: {
      session,
      device,
    },
  }
}

export default FeedPage
