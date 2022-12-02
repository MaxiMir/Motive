import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { AxiosRequestHeaders } from 'axios'
import { PossiblePageError } from '@dto'
import PageService from '@services/page'
import UserModule, { getServerSideUrl } from '@modules/user'
import useUserMetaTags from '@user-hooks/useUserMetaTags'
import useUserPage from '@user-hooks/useUserPage'
import Layout from '@layout'

function UserPage() {
  const { data } = useUserPage()
  const metaTags = useUserMetaTags(data?.content)

  return <Layout {...metaTags}>{data?.content && <UserModule user={data.content} />}</Layout>
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

export default UserPage
