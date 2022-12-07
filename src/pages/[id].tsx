import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { PossiblePageError } from '@dto'
import PageFeature, { PageService } from '@features/page'
import UserFeature from '@features/user'
import useUserPage from '@features/user/hooks/useUserPage'
import useUserMetaTags from '@features/user/hooks/useUserMetaTags'
import { getSearchParams } from '@helpers/url'

function UserPage() {
  const { data } = useUserPage()
  const metaTags = useUserMetaTags(data)

  return <PageFeature {...metaTags}>{data && <UserFeature user={data} />}</PageFeature>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url = '', headers } = ctx.req
  const { id: _, ...params } = getSearchParams(url)
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const nickname = ctx.params?.id || ''
  await queryClient.prefetchQuery(nickname, () => PageService.getUser(nickname as string, { headers, params }))
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
