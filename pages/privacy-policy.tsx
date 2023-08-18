import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { Layout } from 'app/layout'
import { PrivacyPolicyPage } from 'pages/privacy-policy'
import { useMeta } from 'entities/page'

function PrivacyPolicyRoute() {
  const meta = useMeta('privacy-policy')

  return (
    <Layout title={meta.title} description={meta.description}>
      <PrivacyPolicyPage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const detector = new DeviceDetector()
  const device = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)

  return {
    props: {
      session,
      device,
    },
  }
}

export default PrivacyPolicyRoute
