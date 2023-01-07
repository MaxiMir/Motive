import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { getSearchParams } from '@helpers/url'
import UserModule, { useUserMetaTags, useUserPage } from '@modules/user'
import Page, { PageService, PossiblePageError } from '@features/page'

function UserPage() {
  const { data } = useUserPage()
  const metaTags = useUserMetaTags(data)

  return <Page {...metaTags}>{data && <UserModule user={data} />}</Page>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { url = '', headers } = ctx.req
  const queryClient = new QueryClient()
  const { id, ...params } = getSearchParams(url)
  const nickname = (ctx.params?.id || '') as string
  const session = await getSession(ctx)
  await queryClient.prefetchQuery(['page', nickname], () =>
    PageService.getUser(nickname, { headers, params }),
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
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default UserPage
