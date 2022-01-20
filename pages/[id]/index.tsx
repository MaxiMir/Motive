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
  const userMeta = getUserMeta(data?.content)

  return (
    <UserPageContext.Provider value={data}>
      <Layout {...userMeta} client={data?.client} error={error}>
        {data?.content && <User user={data?.content} client={data?.client} />}
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
