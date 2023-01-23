import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import SearchView from '@views/search'
import Page, { PageService, useSearchPage } from '@modules/page'
import useMetaTags from '@hooks/useMetaTags'
import { getSearchParams } from '@helpers/url'
import { Route } from '@href'

function SearchPage() {
  const { data } = useSearchPage()
  const metaTags = useMetaTags('search')

  return (
    <Page title={metaTags.title} description={metaTags.description}>
      {data && <SearchView {...data} />}
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers, url = Route.Search } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const params = getSearchParams(url)
  const session = await getSession(ctx)

  await queryClient.prefetchQuery(['page', Route.Search], () =>
    PageService.getSearch({ headers, params }),
  )

  return {
    props: {
      session,
      device,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default SearchPage
