import React from 'react'
import { GetServerSideProps } from 'next'
import { FavoritesPageSWR } from 'dto'
import PageService from 'services/PageService'
import useFavoritesPage from 'hooks/useFavoritesPage'
import Layout from 'layout'
import Favorites from 'views/Favorites'

export default function FavoritesPage({ fallbackData }: FavoritesPageSWR): JSX.Element {
  const [{ data, error }, mutate] = useFavoritesPage(fallbackData)

  return (
    <Layout title="favorites" error={error}>
      {data?.content && <Favorites favorites={data.content} mutate={mutate} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await PageService.getFavorites()

  return {
    props: {
      fallbackData: data,
    },
  }
}
