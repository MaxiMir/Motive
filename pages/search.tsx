import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import SearchView from 'views/SearchView'

export default function SearchPage(): JSX.Element {
  const mockData = {
    hashtags: [
      { name: 'motivation', count: Math.trunc(Math.random() * 10000) },
      { name: 'develop', count: Math.trunc(Math.random() * 10000) },
      { name: 'health', count: Math.trunc(Math.random() * 10000) },
      { name: 'typescript', count: Math.trunc(Math.random() * 10000) },
      { name: 'relocate', count: Math.trunc(Math.random() * 10000) },
      { name: 'portugal', count: Math.trunc(Math.random() * 10000) },
      { name: 'slimming', count: Math.trunc(Math.random() * 10000) },
      { name: 'run', count: Math.trunc(Math.random() * 10000) },
      { name: 'backend', count: Math.trunc(Math.random() * 10000) },
      { name: 'frontend', count: Math.trunc(Math.random() * 10000) },
      { name: 'promotion', count: Math.trunc(Math.random() * 10000) },
      { name: 'english', count: Math.trunc(Math.random() * 10000) },
    ],
  }
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Search`} statusCode={200}>
      <SearchView hashtags={mockData.hashtags} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}
