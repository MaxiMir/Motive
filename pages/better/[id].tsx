import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Axios from 'lib/axios'
import { PageSWR, UserPage } from 'dto'
import Layout from 'layout'
import UserCard from 'components/UserCard'

const fetcher = async (url: string) => (await Axios.get(url)).data

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR(asPath, () => fetcher(asPath), { fallbackData })
  const { meta, user, client } = data || {}

  return (
    <Layout client={client} error={error} {...meta}>
      <UserCard type="detail" client={client} {...user} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = ctx.req.url as string
  const data = await fetcher(url)

  return {
    props: {
      fallbackData: data,
    },
  }
}
