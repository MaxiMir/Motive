import { GetServerSideProps } from 'next'
import { UserPageSWRDto } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import PageService from 'services/PageService'
import useUserPage from 'hooks/useUserPage'
import { getUserMeta } from 'views/User/helper'
import Layout from 'layout'
import User from 'views/User'

export default function UserDetail({ fallbackData }: UserPageSWRDto): JSX.Element {
  const { data, error } = useUserPage(fallbackData)
  const userMeta = getUserMeta(data?.content.user)

  // TODO REMOVE!
  const client = {
    id: 1,
    nickname: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/avatars/6d483e94-a791-4a75-ba15-99ee48276dd4.webp',
  }

  return (
    <UserPageContext.Provider value={data}>
      <Layout {...userMeta} error={error}>
        {data?.content && <User {...data?.content} client={client} />}
      </Layout>
    </UserPageContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes('_next')) {
    return {
      props: {
        fallbackData: null,
      },
    }
  }

  const fallbackData = await PageService.getUser(ctx.req.url || '')

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
