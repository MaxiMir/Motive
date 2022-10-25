import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { dehydrate, QueryClient } from 'react-query'
import { AxiosRequestHeaders } from 'axios'
import { FOLLOWING } from 'route'
import { PageService } from 'src/common/services/page'
import Layout from 'src/common/layout'
import { Following, useFollowingPage } from '@modules/following'

export default function FollowingPage() {
  const { formatMessage } = useIntl()
  const { data } = useFollowingPage()
  const title = formatMessage({ id: 'page.following.title' })
  const description = formatMessage({ id: 'page.following.description' })

  return (
    <Layout title={title} description={description}>
      {data?.content && <Following users={data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(FOLLOWING, () => PageService.get(FOLLOWING, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
