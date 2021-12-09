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
  const { meta, user, client } = (data as UserPage) || {}

  return (
    <UserPageContext.Provider value={data}>
      <Layout error={error || !fallbackData} {...meta}>
        <UserCard type="detail" client={client} {...user} />
      </Layout>
    </UserPageContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await UserService.getById(ctx.req.url || '')

    return {
      props: {
        fallbackData: data,
      },
    }
  } catch (e) {
    switch (e.response.status) {
      case 404:
        return {
          notFound: true,
        }
      default:
        return {
          props: {
            fallbackData: null,
          },
        }
    }
  }
}
