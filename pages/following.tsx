import { GetServerSideProps } from 'next'
import { getProviders, getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { PageProps, PossiblePageError } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import FollowingView from 'views/FollowingView'
import { QUERY_KEY, useFollowingPage } from 'views/FollowingView/hook'

export default function FollowingPage({ statusCode }: PageProps): JSX.Element {
  const { data } = useFollowingPage()

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Following`} statusCode={statusCode}>
      {data?.content && <FollowingView users={data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const session = await getSession(ctx)
  const providers = await getProviders()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEY, () => PageService.getFollowing({ headers }))
  const state = queryClient.getQueryState<PossiblePageError>(QUERY_KEY)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      session,
      providers,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
