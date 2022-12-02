import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { ClientDto } from '@dto'
import useMetaTags from '@hooks/useMetaTags'
import HomeModule from '@modules/home'
import Layout from '@layout'

function HomePage() {
  const metaTags = useMetaTags('home')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      <HomeModule />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const client = session?.user as ClientDto | undefined

  if (!client) {
    return {
      props: {
        session,
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: client.nickname,
      basePath: false,
    },
  }
}

export default HomePage
