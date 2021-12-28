import React from 'react'
import { GetServerSideProps } from 'next'
import { FollowingPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import useFollowingPage from 'hooks/useFollowingPage'
import Layout from 'layout'
import Following from 'views/Following'

export default function FollowingPage({ fallbackData }: FollowingPageSWRDto): JSX.Element {
  const [{ data, error }, mutate] = useFollowingPage(fallbackData)

  // TODO REMOVE!
  const client = {
    id: 1,
    nickname: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/avatars/6d483e94-a791-4a75-ba15-99ee48276dd4.webp',
  }

  const isAuthorized = !!client?.id // todo check on auth

  return (
    <Layout title="Following" client={client} error={error}>
      {data && <Following users={data.content} isAuthorized={isAuthorized} mutate={mutate} />}
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
