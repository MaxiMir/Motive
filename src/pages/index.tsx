import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { ClientDto } from '@dto'
import PageFeature from '@features/page'
import HomeModule from '@modules/home'
import useMetaTags from '@hooks/useMetaTags'

function HomePage() {
  const metaTags = useMetaTags('home')

  return (
    <PageFeature title={metaTags.title} description={metaTags.description}>
      <HomeModule />
    </PageFeature>
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
