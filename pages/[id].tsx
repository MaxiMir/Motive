import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getUserPath } from 'route'
import { PageSWR, UserPage } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import PageService from 'services/PageService'
import Layout from 'layout'
import UserCard from 'components/UserCard'

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR<UserPage>(asPath, () => PageService.getURL(asPath), { fallbackData }) // swr detail page
  const { meta, user, client } = (data as UserPage) || {}

  return (
    <UserPageContext.Provider value={data}>
      <Layout client={client} error={error || !fallbackData} {...meta}>
        <UserCard type="detail" client={client} {...user} />
      </Layout>
    </UserPageContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await PageService.getURL(getUserPath(ctx.req.url || ''))

    return {
      props: {
        fallbackData: data,
      },
    }
  } catch (e) {
    switch (e.response.status) {
      case '404':
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
