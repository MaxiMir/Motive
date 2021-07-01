import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { MainPage } from 'dto'
import Layout from 'layout'
import UserCardDetail from 'components/UserCard/UserCardDetail'

export default function UserDetail({ meta, user }: MainPage): JSX.Element {
  return (
    <Layout {...meta}>
      <UserCardDetail {...user} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await Axios.get(ctx.req.url as string)

  return { props: data }
}
