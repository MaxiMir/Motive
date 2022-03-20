import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { PageProps, PossiblePageError } from 'dto'
import { SEARCH } from 'route'
import PageService from 'services/PageService'
import SearchView from 'views/SearchView'
import useSearchPage from 'views/SearchView/hook'

export default function SearchPage({ statusCode }: PageProps): JSX.Element {
  const { data } = useSearchPage()

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Search`} statusCode={statusCode}>
      {data?.content && <SearchView {...data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url, headers } = ctx.req

  if (ctx.req.url?.includes('_next')) {
    return {
      props: {
        statusCode: 200,
      },
    }
  }

  const urn = url || SEARCH
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  await queryClient.prefetchQuery(urn, () => PageService.get(urn || SEARCH, { headers }))
  const state = queryClient.getQueryState<PossiblePageError>(urn)
  const statusCode = state?.data?.message?.statusCode || 200

  return {
    props: {
      session,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
