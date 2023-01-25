import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { getSearchParams } from '@lib/helpers/url'
import Layout from '@app/ui/Layout'
import SearchPage from '@pages/search'
import { getSearchPage, useSearchPage } from '@entities/pages'
import useMetaTags from '@lib/hooks/useMetaTags'
import { Route } from '@shared/config/routes'

function SearchRoute() {
  const { data } = useSearchPage()
  const metaTags = useMetaTags('search')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      {data && <SearchPage {...data} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers, url = Route.Search } = ctx.req
  const queryClient = new QueryClient()
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const params = getSearchParams(url)
  const session = await getSession(ctx)

  await queryClient.prefetchQuery(['page', Route.Search], () => getSearchPage({ headers, params }))

  return {
    props: {
      session,
      device,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default SearchRoute
