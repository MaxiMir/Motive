import { GetServerSideProps } from 'next'
import { RatingPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/Rating'
import useRatingPage from 'views/Rating/hook'

export default function RatingPage({ fallbackData }: RatingPageSWRDto): JSX.Element {
  const { data, error } = useRatingPage(fallbackData)

  // TODO REMOVE!
  const client = {
    id: 1,
    nickname: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/avatars/6d483e94-a791-4a75-ba15-99ee48276dd4.webp',
  }

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating users`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • Rating the most motivating, creative, and supportive users`}
      client={client}
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
