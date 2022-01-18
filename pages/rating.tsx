import { GetServerSideProps } from 'next'
import { RatingPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/Rating'
import useRatingPage from 'views/Rating/hook'

export default function RatingPage({ fallbackData }: RatingPageSWRDto): JSX.Element {
  const { data, error } = useRatingPage(fallbackData)

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating users`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating the most motivating, creative, and supportive users`}
      client={data?.client}
      error={error}
    >
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
