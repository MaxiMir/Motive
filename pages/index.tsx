import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import Layout from '@app/ui/Layout'
import { ClientDto } from '@entities/user'
import HomePage from '@pages/home'
import useMetaTags from '@hooks/useMetaTags'

function HomeRoute() {
  const metaTags = useMetaTags('home')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      <HomePage />
    </Layout>
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

export default HomeRoute
