import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import DeviceDetector from 'node-device-detector'
import Layout from '@app/ui/Layout'
import { getSearchParams } from '@lib/helpers/url'
import UserPage from '@pages/user'
import { PossiblePageError, getUserPage, useUserMetaTags, useUserPage } from '@entities/pages'

function UserRoute() {
  const { data } = useUserPage()
  const metaTags = useUserMetaTags(data)

  return <Layout {...metaTags}>{data && <UserPage user={data} />}</Layout>
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
