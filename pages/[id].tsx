import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
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
  const nickname = (ctx.params?.id || '') as string
  await queryClient.prefetchQuery(['page', nickname], () =>
    getUserPage(nickname, { headers, params }),
  )
  const state = queryClient.getQueryState<PossiblePageError>(['page', nickname])
  const detector = new DeviceDetector()
  const { device } = detector.detect(headers['user-agent'] || '')
  const session = await getSession(ctx)
  const statusCode = state?.data?.message?.statusCode || 200

  if (statusCode === 404) {
    return {
      props: {
        session,
        device,
      },
      notFound: true,
    }
  }

  return {
    props: {
      session,
      device,
      statusCode,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default UserRoute
