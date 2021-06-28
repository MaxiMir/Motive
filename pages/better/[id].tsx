import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { MainPage } from 'dto'
import Layout from 'layout'
import UserCardDetail from 'components/UserCard/UserCardDetail'

const UserDetail = ({ meta, user }: MainPage) => (
  <Layout {...meta}>
    <UserCardDetail {...user} />
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await Axios.get(ctx.req.url as string)

  return { props: data }
}

export default UserDetail
