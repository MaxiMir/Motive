import { GetServerSideProps } from 'next'
import { SubscriptionPageSWRDto } from 'dto'
import useFollowersPage from 'hooks/useFollowersPage'
import PageService from 'services/PageService'
import Layout from 'layout'
import Followers from 'views/Followers'

export default function UserFollowers({ fallbackData }: SubscriptionPageSWRDto): JSX.Element {
  const { data, error } = useFollowersPage(fallbackData)

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Followers`} client={data?.client} error={error}>
      {data?.content && <Followers users={data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nickname = (ctx.params?.id || '') as string

  if (ctx.req.url?.includes('_next')) {
    return {
      props: {
        fallbackData: null,
      },
    }
  }

  const fallbackData = await PageService.getFollowers(nickname)

  if (!fallbackData.content) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      fallbackData,
    },
  }
}
