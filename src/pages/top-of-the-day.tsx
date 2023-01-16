import { GetServerSideProps } from 'next'
import TopOfTheDayModule, { useMetaTags } from '@modules/top-of-the-day'
import Page from '@features/page'
import DeviceDetector from 'node-device-detector'
import { getSession } from 'next-auth/react'

function TopOfTheDayPage() {
  const metaTags = useMetaTags()

  return (
    <Page title={metaTags.title}>
      <TopOfTheDayModule />
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

export default TopOfTheDayPage
