import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from 'app/layout'
import { UserPage } from 'pages/user'
import { useUserMetaTags, useUserPage } from 'entities/page'
import { PossiblePageError, getUserPage } from 'shared/api'
import { getSearchParams } from 'shared/lib/helpers'

function UserRoute() {
  const { data } = useUserPage()
  const meta = useUserMetaTags(data)

  return <Layout {...meta}>{data && <UserPage user={data} />}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url = '', headers } = ctx.req
  const queryClient = new QueryClient()
  const { id, ...params } = getSearchParams(url)
  const nickname = String(ctx.params?.id)
  await queryClient.prefetchQuery(['page', nickname], () =>
    getUserPage(nickname, { headers, params }),
  )
  const state = queryClient.getQueryState<PossiblePageError>(['page', nickname])
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

export default UserRoute
