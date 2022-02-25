import { GetServerSideProps } from 'next'
import { getProviders } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { PageProps, PossiblePageError } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import FollowingView from 'views/FollowingView'
import { QUERY_KEY, useFollowingPage } from 'views/FollowingView/hook'

export default function FollowingPage({ providers, statusCode }: PageProps): JSX.Element {
  const { data } = useFollowingPage()
  const isAuthorized = !!data?.client

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • Following`}
      client={data?.client}
      providers={providers}
      statusCode={statusCode}
    >
      {data?.content && <FollowingView users={data.content} isAuthorized={isAuthorized} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEY, PageService.getFollowing)
  const state = queryClient.getQueryState<PossiblePageError>(QUERY_KEY)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      providers,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
