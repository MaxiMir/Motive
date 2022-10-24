import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { AxiosRequestHeaders } from 'axios'
import { PossiblePageError } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import UserView from './components/UserView'
import { useUserMeta, useUserPage } from './hook'
import { getServerSideUrl } from './helper'

export default function UserPage() {
  const { data } = useUserPage()
  const userMeta = useUserMeta(data?.content)

  return <Layout {...userMeta}>{data?.content && <UserView user={data.content} />}</Layout>
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
