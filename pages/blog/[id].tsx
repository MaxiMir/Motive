import { parse } from 'express-useragent'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { useRouter } from 'next/router'
/* eslint-disable boundaries/element-types */
import { Layout } from 'app/layout'
import { ArticlePage } from 'pages/article'
/* eslint-disable boundaries/element-types */
import { useArticlePage } from 'entities/page'
import { getArticlePage, PossiblePageError } from 'shared/api'

function ArticleRoute() {
  const { query } = useRouter()
  const pathname = String(query.id)
  const { data } = useArticlePage(pathname)

  return (
    <Layout title={data?.title} description={data?.description} image={data?.image} type="article">
      {data && <ArticlePage article={data} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const queryClient = new QueryClient()
  const pathname = String(ctx.params?.id)
  const params = { locale: ctx.locale, share: ctx.query.share }
  await queryClient.prefetchQuery(['page', pathname], () =>
    getArticlePage(pathname, { headers, params }),
  )
  const state = queryClient.getQueryState<PossiblePageError>(['page', pathname])
  const session = await getSession(ctx)
  const userDevice = parse(headers['user-agent'] || '')
  const statusCode = state?.data?.message?.statusCode || 200

  if (statusCode === 404) {
    return {
      props: {
        userDevice,
        session,
      },
      notFound: true,
    }
  }

  return {
    props: {
      userDevice,
      session,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ArticleRoute
