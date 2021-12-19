import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PageSWR, UserPage } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import PageService from 'services/PageService'
import Layout from 'layout'
import Detail from 'views/Detail'

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR<UserPage>(asPath, () => PageService.getUser(asPath), { fallbackData }) // swr detail page
  const user = data?.content

  return (
    <UserPageContext.Provider value={data}>
      <Layout
        title={user && `${user.name} profile on ${process.env.NEXT_PUBLIC_APP_NAME}`}
        description={user && `See how ${user.name} (@${user.nickname}) accomplishes his goals`}
        url={user && `${process.env.HOST}/${user.nickname}`}
        type="profile"
        error={error}
      >
        {user && <Detail user={user} client={data?.client} />}
      </Layout>
    </UserPageContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // check on find json in fs:
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
