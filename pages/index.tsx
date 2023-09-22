import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Layout } from 'app/layout'
import { HomePage } from 'pages/home'
import { useMeta } from 'entities/page'
import { Viewer } from 'entities/viewer'

function HomeRoute() {
  const meta = useMeta('home')

  return (
    <Layout title={meta.title} description={meta.description}>
      <HomePage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const viewer = session?.user as Viewer | undefined

  if (!viewer?.nickname) {
    return {
      props: {
        session,
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: viewer?.nickname,
      basePath: false,
    },
  }
}

export default HomeRoute
