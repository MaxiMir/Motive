import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { Layout } from 'app/layout'
import { HomePage } from 'pages/home'
import { useMeta } from 'entities/page'
import { ClientDto } from 'shared/api'

function HomeRoute() {
  const meta = useMeta('home')

  return (
    <Layout title={meta.title} description={meta.description}>
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
