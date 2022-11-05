import Layout from '@layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { AxiosRequestHeaders } from 'axios'
import { Route } from '@href'
import { SearchModule, useSearchPage } from '@modules/search'
import { PageService } from '@services/page'

export default function SearchPage() {
  const { formatMessage } = useIntl()
  const { data } = useSearchPage()
  const title = formatMessage({ id: 'page.search.title' })
  const description = formatMessage({ id: 'page.search.description' })

  return (
    <Layout title={title} description={description}>
      {data?.content && <SearchModule {...data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url = Route.Search } = ctx.req

  if (ctx.req.url?.includes('_next')) {
    return {
      props: {
        statusCode: 200,
      },
    }
  }

  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(url, () => PageService.get(url, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
