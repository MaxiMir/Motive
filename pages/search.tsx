import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import SearchPage from 'pages/search'
import { useSearchPage, useMetaTags } from 'entities/page'
import { getSearchPage } from 'shared/api'
import { Route } from 'shared/config'
import { getSearchParams } from 'shared/lib/helpers'

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
