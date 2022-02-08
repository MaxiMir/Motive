import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/RatingView'
import { QUERY_KEY, useRatingPage } from 'views/RatingView/hook'
import { PageStatus, PossiblePageError } from '../dto'

export default function RatingPage({ statusCode }: PageStatus): JSX.Element {
  const { data } = useRatingPage()

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating users`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating the most motivating, creative, and supportive users`}
      client={data?.client}
      statusCode={statusCode}
    >
      {data?.content && <Rating {...data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEY, PageService.getRating)
  const state = queryClient.getQueryState<PossiblePageError>(QUERY_KEY)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
