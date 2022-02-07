import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import PageService from 'services/PageService'
import Layout from 'layout'
import FollowingView from 'views/FollowingView'
import { QUERY_KEY, useFollowingPage } from 'views/FollowingView/hook'

export default function FollowingPage(): JSX.Element {
  const { data, error } = useFollowingPage()
  const isAuthorized = !!data?.client

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Following`} client={data?.client} error={error}>
      {data && <FollowingView users={data.content} isAuthorized={isAuthorized} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEY, PageService.getFollowing)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
