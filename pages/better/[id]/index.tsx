import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PageSWR, UserPage } from 'dto'
import { createGenericContext } from 'context/createGenericContext'
import PageService from 'services/PageService'
import Layout from 'layout'
import UserCard from 'components/UserCard'

export const UserPageContext = createGenericContext<UserPage>()

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR<UserPage>(asPath, () => PageService.getURL(asPath), { fallbackData }) // swr detail page
  const { meta, user, client } = (data as UserPage) || {}

  return (
    <UserPageContext.Provider value={data}>
      <Layout client={client} error={error} {...meta}>
        <UserCard type="detail" client={client} {...user} />
      </Layout>
    </UserPageContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await PageService.getURL(ctx.req.url as string)

  return {
    props: {
      fallbackData: data,
    },
  }
}
