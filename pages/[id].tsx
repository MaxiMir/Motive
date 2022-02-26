import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getProviders } from 'next-auth/react'
import { PageProps, PossiblePageError } from 'dto'
import PageService from 'services/PageService'
import { getUserMeta } from 'views/UserView/helper'
import Layout from 'layout'
import UserView from 'views/UserView'
import { useUserPage } from 'views/UserView/hook'

export default function UserDetail({ providers, statusCode }: PageProps): JSX.Element {
  const { data } = useUserPage()
  const userMeta = getUserMeta(data?.content)

  return (
    <Layout {...userMeta} statusCode={statusCode} providers={providers}>
      {data?.content && <UserView user={data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes('_next')) {
    return {
      props: {
        statusCode: 200,
      },
    }
  }

  const providers = await getProviders()
  const queryClient = new QueryClient()
  const userHref = ctx.req.url || ''
  const nickname = ctx.params?.id || ''
  await queryClient.prefetchQuery(nickname, () => PageService.getUser(userHref))
  const state = queryClient.getQueryState<PossiblePageError>(nickname)
  const statusCode = state?.data?.message?.statusCode || 200

  if (statusCode === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      providers,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
