import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { RatingPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/Rating'

export default function RatingPage({ fallbackData }: RatingPageSWRDto): JSX.Element {
  const { data, error } = useSWR('Rating', PageService.getRating, { fallbackData })

  return (
    <Layout title="Rating users" error={error}>
      {data?.content && <Rating {...data.content} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const fallbackData = await PageService.getRating()

  return {
    props: {
      fallbackData,
    },
  }
}
