import { GetServerSideProps } from 'next'
import { getProviders } from 'next-auth/react'
import { PageProps } from 'dto'
import Layout from 'layout'
import MainView from 'views/MainView'

export default function MainPage({ providers }: PageProps): JSX.Element {
  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • a social network for achieving goals`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
      providers={providers}
      statusCode={200}
      withVerticalPadding={false}
    >
      <MainView />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
