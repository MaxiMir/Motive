import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import { RatingPage } from 'pages/rating'
import { useRatingPage, useMeta } from 'entities/page'
import { getRatingPage } from 'shared/api'
import { Route } from 'shared/config'

function RatingRoute() {
  const { data } = useRatingPage()
  const meta = useMeta('rating')

  return (
    <Layout title={meta.title} description={meta.description}>
      {data && <RatingPage users={data} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['page', Route.Rating], () => getRatingPage({ headers }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default RatingRoute
