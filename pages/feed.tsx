import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import { FeedPage } from 'pages/feed'
import { useBlogPage, useMeta } from 'entities/page'
import { getBlogPage } from 'shared/api'
import { Route } from 'shared/config'

function FeedRoute() {
  const meta = useMeta('feed')
  const { data } = useBlogPage()

  return (
    <Layout title={meta.title} description={meta.description}>
      {data && <FeedPage articles={data.articles} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const params = { locale: ctx.locale }
  await queryClient.prefetchQuery(['page', Route.Blog], () => getBlogPage({ headers, params }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default FeedRoute
