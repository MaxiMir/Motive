import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { Layout } from '@app/ui'
import ContactPage from '@pages/contact'
import { useMetaTags } from 'shared/lib/hooks'

function ContactRoute() {
  const metaTags = useMetaTags('contact')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      <ContactPage />
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

export default ContactRoute
