import React from 'react'
import { GetServerSideProps } from 'next'
import { FollowingPageSWR } from 'dto'
import PageService from 'services/PageService'
import useFollowingPage from 'hooks/useFollowingPage'
import Layout from 'layout'
import Following from 'views/Following'

export default function FollowingPage({ fallbackData }: FollowingPageSWR): JSX.Element {
  const [{ data, error }, mutate] = useFollowingPage(fallbackData)

  // TODO REMOVE!
  const client = { id: 0, name: '', nickname: '', avatar: '' }

  return (
    <Layout title="Following" error={error}>
      {data && <Following users={data.content} client={client} mutate={mutate} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await PageService.getFollowing()

  return {
    props: {
      fallbackData: data,
    },
  }
}
