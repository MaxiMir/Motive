import React from 'react'
import { GetServerSideProps } from 'next'
import { SubscriptionPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import useFollowingPage from 'hooks/useFollowingPage'
import Layout from 'layout'
import Following from 'views/Following'

export default function FollowingPage({ fallbackData }: SubscriptionPageSWRDto): JSX.Element {
  const [{ data, error }, mutate] = useFollowingPage(fallbackData)
  const isAuthorized = !!data?.client?.id // todo check on auth

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Following`} client={data?.client} error={error}>
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
