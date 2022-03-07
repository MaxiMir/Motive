import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { ClientDto } from 'dto'
import Layout from 'layout'
import MainView from 'views/MainView'

export default function MainPage(): JSX.Element {
  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • a social network for achieving goals`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
      withVerticalPadding={false}
    >
      <MainView />
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
