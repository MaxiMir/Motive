import { GetServerSideProps } from 'next'
import { UserPageSWR } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import PageService from 'services/PageService'
import useUserPage from 'hooks/useUserPage'
import Layout from 'layout'
import User from 'views/User'
import { getUserMeta } from 'helpers/user'

export default function UserDetail({ fallbackData }: UserPageSWR): JSX.Element {
  const { data, error } = useUserPage(fallbackData)
  const userMeta = getUserMeta(data?.content)

  // TODO REMOVE!
  const client = { id: 0, name: '', nickname: '', avatar: '' }

  return (
    <UserPageContext.Provider value={data}>
      <Layout {...userMeta} error={error}>
        {data?.content && <User user={data?.content} client={client} />}
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
