import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { UserPageDto } from 'dto'
import PageService from 'services/PageService'
import { getUserMeta } from 'views/UserView/helper'
import Layout from 'layout'
import UserView from 'views/UserView'
import { useUserPage } from 'views/UserView/hook'

export default function UserDetail(): JSX.Element {
  const { data, error } = useUserPage()
  const userMeta = getUserMeta(data?.content)

  return (
    <Layout {...userMeta} client={data?.client} error={error}>
      {data?.content && <UserView user={data?.content} client={data?.client} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes('_next')) {
    return {
      props: {},
    }
  }

  const queryClient = new QueryClient()
  const user = ctx.req.url || ''
  await queryClient.prefetchQuery(user, () => PageService.getUser(user))
  const state = queryClient.getQueryState<UserPageDto>(user)

  if (!state?.data?.content) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
