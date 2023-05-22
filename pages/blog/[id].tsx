import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { dehydrate, QueryClient } from 'react-query'
import { useRouter } from 'next/router'
/* eslint-disable boundaries/element-types */
import { Layout } from 'app/layout'
import { ArticlePage } from 'pages/article'
/* eslint-disable boundaries/element-types */
import { useArticlePage } from 'entities/page'
import { getArticlePage, OGType, PossiblePageError } from 'shared/api'

function ArticleRoute() {
  const { query } = useRouter()
  const pathname = String(query.id)
  const { data } = useArticlePage(pathname)

  return (
    <Layout
      title={data?.title}
      description={data?.description}
      image={data?.image}
      type={OGType.Article}
    >
      {data && <ArticlePage article={data} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const pathname = String(ctx.params?.id)
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
