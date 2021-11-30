import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PageSWR, UserPage } from 'dto'
import PageService from 'services/PageService'
import { SWRDataContext } from 'context/swrDataContext'
import Layout from 'layout'
import UserCard from 'components/UserCard'

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR<UserPage>(asPath, () => PageService.getDynamic(asPath), { fallbackData }) // swr detail page
  const { meta, user, client } = (data as UserPage) || {}

  return (
    <SWRDataContext.Provider value={data}>
      <Layout client={client} error={error} {...meta}>
        <UserCard type="detail" client={client} {...user} />
      </Layout>
    </SWRDataContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await PageService.getDynamic(ctx.req.url as string)

  return {
    props: {
      fallbackData: data,
    },
  }
}
