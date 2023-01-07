import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { Route } from '@href'
import SearchModule, { useSearchPage } from '@modules/search'
import Page, { PageService } from '@features/page'
import useMetaTags from '@hooks/useMetaTags'
import { getSearchParams } from '@helpers/url'

function SearchPage() {
  const { data } = useSearchPage()
  const metaTags = useMetaTags('search')

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      {data && <SearchModule {...data} />}
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers, url = Route.Search } = ctx.req
  const queryClient = new QueryClient()
  const params = getSearchParams(url)
  const session = await getSession(ctx)
  await queryClient.prefetchQuery(['page', Route.Search], () =>
    PageService.getSearch({ headers, params }),
  )

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default SearchPage
