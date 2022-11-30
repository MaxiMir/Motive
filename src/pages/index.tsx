import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { ClientDto } from '@dto'
import HomeModule from '@modules/home'
import Layout from '@layout'

function HomePage() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.home.title' })
  const description = formatMessage({ id: 'page.home.description' })

  return (
    <Layout title={title} description={description}>
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
