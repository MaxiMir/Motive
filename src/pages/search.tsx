import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { AxiosRequestHeaders } from 'axios'
import { Route } from '@href'
import useMetaTags from '@hooks/useMetaTags'
import SearchModule, { useSearchPage } from '@modules/search'
import PageService from '@services/page'
import Layout from '@layout'

function SearchPage() {
  const { data } = useSearchPage()
  const metaTags = useMetaTags('search')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
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

export default SearchPage
