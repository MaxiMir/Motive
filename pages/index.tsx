import { GetServerSideProps } from 'next'
import { MainPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import useHomePage from 'views/Main/hook'
import Main from 'views/Main'

export default function HomePage({ fallbackData }: MainPageSWRDto): JSX.Element {
  const { error } = useHomePage(fallbackData)

  // TODO REMOVE!
  const client = {
    id: 1,
    nickname: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/avatars/6d483e94-a791-4a75-ba15-99ee48276dd4.webp',
  }

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
      error={error}
      client={client}
      withVerticalPadding={false}
    >
      <Main />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await PageService.getMain()

  return {
    props: {
      fallbackData: data,
    },
  }
}
