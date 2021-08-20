import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import Axios from 'lib/axios'
import { UserPage } from 'dto'
import Layout from 'layout'
import UserCard from 'components/UserCard'

const queryFn = async (url: string) => (await Axios.get(url)).data

export default function UserDetail(): JSX.Element {
  const { asPath } = useRouter()
  const { data, status } = useQuery<UserPage>(asPath, () => queryFn(asPath))
  const { meta, user } = (data as UserPage) || {}

  return (
    <Layout status={status} {...meta}>
      <UserCard type="detail" {...user} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = ctx.req.url as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(url, () => queryFn(url))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
