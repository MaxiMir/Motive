import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { AxiosRequestHeaders } from 'axios'
import { SEARCH } from 'route'
import { PageProps, PossiblePageError } from 'dto'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import SearchView from 'views/SearchView'
import useSearchPage from 'views/SearchView/hook'

const i18n = {
  en: {
    title: 'Search',
    description: 'Search by user 🥷, target 💎, or hashtag',
  },
  ru: {
    title: 'Поиск',
    description: 'Поиск по пользователям 🥷, целям 💎 или хэштегам',
  },
}

export default function SearchPage({ statusCode }: PageProps) {
  const { locale } = useLocale()
  const { title, description } = i18n[locale]
  const { data } = useSearchPage()

  return (
    <Layout title={title} description={description} statusCode={statusCode}>
      {data?.content && <SearchView {...data.content} locale={locale} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url } = ctx.req

  // TODO:
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
  const headers = ctx.req.headers as AxiosRequestHeaders
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
