import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { PageStatus, PossiblePageError } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import MainView from 'views/MainView'
import { useHomePage } from 'views/MainView/hook'
import { QUERY_KEY } from 'views/RatingView/hook'

export default function MainPage({ statusCode }: PageStatus): JSX.Element {
  const { data } = useHomePage()

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • a social network for achieving goals`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
      client={data?.client}
      statusCode={statusCode}
      withVerticalPadding={false}
    >
      <MainView />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEY, PageService.getMain)
  const state = queryClient.getQueryState<PossiblePageError>(QUERY_KEY)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
