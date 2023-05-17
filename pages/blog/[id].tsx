import matter from 'gray-matter'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { dehydrate, QueryClient } from 'react-query'
/* eslint-disable boundaries/element-types */
import { Layout } from 'app/layout'
/* eslint-disable boundaries/element-types */
import { useArticlePage } from 'entities/page'
import { getArticlePage, OGType, PossiblePageError } from 'shared/api'

function ArticleRoute() {
  const { data } = useArticlePage()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data: meta } = data && matter(data?.content)

  return (
    <Layout
      title={meta.title}
      description={meta.description}
      image={data?.image}
      type={OGType.Article}
    >
      {/* <ArticlePage data={data} href={href} content={content} more={more} /> */}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const pathname = String(ctx.params)
  const params = { locale: ctx.locale }
  await queryClient.prefetchQuery(['page', pathname], () =>
    getArticlePage(pathname, { headers, params }),
  )
  const state = queryClient.getQueryState<PossiblePageError>(['page', pathname])
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)
  const statusCode = state?.data?.message?.statusCode || 200

  if (statusCode === 404) {
    return {
      props: {
        session,
        device,
      },
      notFound: true,
    }
  }

  return {
    props: {
      session,
      device,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default ArticleRoute
