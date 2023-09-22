import { parse } from 'express-useragent'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import { BlogPage } from 'pages/blog'
import { useMeta, useBlogPage } from 'entities/page'
import { getBlogPage } from 'shared/api'
import { Route } from 'shared/config'

function BlogRoute() {
  const meta = useMeta('blog')
  const { data } = useBlogPage()

  return (
    <Layout title={meta.title} description={meta.description}>
      {data && <BlogPage articles={data.articles} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const userDevice = parse(headers['user-agent'] || '')
  const params = { locale: ctx.locale }
  await queryClient.prefetchQuery(['page', Route.Blog], () => getBlogPage({ headers, params }))

  return {
    props: {
      userDevice,
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default BlogRoute
