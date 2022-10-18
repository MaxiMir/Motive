import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { AxiosRequestHeaders } from 'axios'
import { PossiblePageError } from 'dto'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import { getServerSideUrl, getUserMeta } from 'views/UserView/helper'
import Layout from 'layout'
import UserView from 'views/UserView'
import { useUserPage } from 'views/UserView/hook'

export default function UserDetail() {
  const { data } = useUserPage()
  const { locale } = useLocale()
  const userMeta = getUserMeta(data?.content, locale)

  return <Layout {...userMeta}>{data?.content && <UserView user={data.content} locale={locale} />}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url = '' } = ctx.req
  const serverSideUrl = getServerSideUrl(url)
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const nickname = ctx.params?.id || ''
  const headers = ctx.req.headers as AxiosRequestHeaders

  await queryClient.prefetchQuery(nickname, () => PageService.getUser(serverSideUrl, { headers }))
  const state = queryClient.getQueryState<PossiblePageError>(nickname)
  const statusCode = state?.data?.message?.statusCode || 200

  if (statusCode === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
