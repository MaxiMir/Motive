import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { PageStatus, PossiblePageError } from 'dto'
import PageService from 'services/PageService'
import { getUserMeta } from 'views/UserView/helper'
import Layout from 'layout'
import UserView from 'views/UserView'
import { useUserPage } from 'views/UserView/hook'

export default function UserDetail({ statusCode }: PageStatus): JSX.Element {
  const { data } = useUserPage()
  const userMeta = getUserMeta(data?.content)

  return (
    <Layout {...userMeta} client={data?.client} statusCode={statusCode}>
      {data?.content && <UserView user={data.content} client={data?.client} />}
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

  const queryClient = new QueryClient()
  const user = ctx.req.url || ''
  await queryClient.prefetchQuery(user, () => PageService.getUser(user))
  const state = queryClient.getQueryState<PossiblePageError>(user)
  const statusCode = state?.data?.message?.statusCode || 200

  if (statusCode === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
