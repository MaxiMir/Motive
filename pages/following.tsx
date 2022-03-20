import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { PageProps, PossiblePageError } from 'dto'
import { RATING } from 'route'
import PageService from 'services/PageService'
import Layout from 'layout'
import FollowingView from 'views/FollowingView'
import useFollowingPage from 'views/FollowingView/hook'

export default function FollowingPage({ statusCode }: PageProps): JSX.Element {
  const { data } = useFollowingPage()

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Following`} statusCode={statusCode}>
      {data?.content && <FollowingView users={data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url, headers } = ctx.req

  if (url?.includes('_next')) {
    return {
      props: {
        statusCode: 200,
      },
    }
  }

  const urn = url || RATING
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  await queryClient.prefetchQuery(urn, () => PageService.get(urn, { headers }))
  const state = queryClient.getQueryState<PossiblePageError>(urn)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      session,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
