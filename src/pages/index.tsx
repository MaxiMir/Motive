import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { ClientDto } from '@modules/user'
import HomeView from '@views/home'
import Page from '@modules/page'
import useMetaTags from '@hooks/useMetaTags'

function HomePage() {
  const metaTags = useMetaTags('home')

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      <HomeView />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)
  const client = session?.user as ClientDto | undefined

  if (!client) {
    return {
      props: {
        session,
        device,
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: client?.nickname,
      basePath: false,
    },
  }
}

export default HomePage
