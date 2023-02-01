import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { Layout } from 'app/layout'
import { FeedPage } from 'pages/feed'
import { useMetaTags } from 'entities/page'

function FeedRoute() {
  const metaTags = useMetaTags('feed')

  return (
    <Layout title={metaTags.title}>
      <FeedPage />
    </Layout>
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

export default FeedRoute
