import { GetServerSideProps } from 'next'
import PageService from 'services/PageService'
import Layout from 'layout'
import MainView from 'views/MainView'
import { useHomePage } from 'views/MainView/hook'
import { dehydrate, QueryClient } from 'react-query'
import { QUERY_KEY } from '../views/RatingView/hook'

export default function MainPage(): JSX.Element {
  const { data, error } = useHomePage()

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • a social network for achieving goals`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
      error={error}
      client={data?.client}
      withVerticalPadding={false}
    >
      <MainView />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEY, PageService.getMain)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
