import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { PageProps, PossiblePageError } from 'dto'
import { RATING } from 'route'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/RatingView'
import useRatingPage from 'views/RatingView/hook'

export default function RatingPage({ statusCode }: PageProps): JSX.Element {
  const { data } = useRatingPage()

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating users`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating the most motivating, creative, and supportive users`}
      statusCode={statusCode}
    >
      {data?.content && <Rating {...data.content} />}
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
  const state = queryClient.getQueryState<PossiblePageError>(RATING)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      session,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
