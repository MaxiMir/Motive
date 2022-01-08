import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { RatingPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/Rating'

export default function RatingPage({ fallbackData }: RatingPageSWRDto): JSX.Element {
  const { data, error } = useSWR('Rating', PageService.getRating, { fallbackData })

  // TODO REMOVE!
  const client = {
    id: 1,
    nickname: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/avatars/6d483e94-a791-4a75-ba15-99ee48276dd4.webp',
  }

  return (
    <Layout title="Rating users" client={client} error={error}>
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