import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import ContactView from '@views/contact'
import Page from '@features/page'
import useMetaTags from '@hooks/useMetaTags'

function ContactPage() {
  const metaTags = useMetaTags('contact')

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      <ContactView />
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

export default ContactPage
