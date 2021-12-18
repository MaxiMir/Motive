import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PageSWR, UserPage } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import UserService from 'services/UserService'
import Layout from 'layout'
import UserCard from 'components/UserCard'

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR<UserPage>(asPath, () => UserService.getById(asPath), { fallbackData }) // swr detail page
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
        {user && <UserCard tmpl="detail" user={user} client={data.client} />}
      </Layout>
    </UserPageContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await UserService.getById(ctx.req.url || '')

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      fallbackData: data,
    },
  }
}
