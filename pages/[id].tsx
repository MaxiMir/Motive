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
  const dataLoaded = data?.content && data?.client

  return (
    <UserPageContext.Provider value={data}>
      <Layout {...data?.meta} error={error}>
        {dataLoaded && <UserCard type="detail" user={data.content} client={data.client} />}
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
