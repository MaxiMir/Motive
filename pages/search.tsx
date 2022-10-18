import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { AxiosRequestHeaders } from 'axios'
import { SEARCH } from 'route'
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
  uk: {
    title: 'Пошук',
    description: 'Пошук за користувачами 🥷, цілям 💎 або хештегам',
  },
}

export default function SearchPage() {
  const { locale } = useLocale()
  const { data } = useSearchPage()
  const { title, description } = i18n[locale]

  return (
    <Layout title={title} description={description}>
      {data?.content && <SearchView {...data.content} locale={locale} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url = SEARCH } = ctx.req

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
