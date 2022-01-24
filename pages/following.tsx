import React from 'react'
import { GetServerSideProps } from 'next'
import { SubscriptionPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import FollowingView from 'views/FollowingView'
import useFollowingPage from 'views/FollowingView/hook'

export default function FollowingPage({ fallbackData }: SubscriptionPageSWRDto): JSX.Element {
  const { data, error, mutateUsers } = useFollowingPage(fallbackData)
  const isAuthorized = !!data?.client

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Following`} client={data?.client} error={error}>
      {data && <FollowingView users={data.content} isAuthorized={isAuthorized} mutateUsers={mutateUsers} />}
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
