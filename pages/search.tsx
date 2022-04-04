import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { SEARCH } from 'route'
import { PageProps, PossiblePageError } from 'dto'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import SearchView from 'views/SearchView'
import useSearchPage from 'views/SearchView/hook'

const i18n = {
  en: {
    title: 'Search',
  },
  ru: {
    title: 'Поиск',
  },
}

export default function SearchPage({ statusCode }: PageProps): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]
  const { data } = useSearchPage()

  return (
    <Layout title={title} statusCode={statusCode}>
      {data?.content && <SearchView {...data.content} locale={locale} />}
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
