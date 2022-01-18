import { GetServerSideProps } from 'next'
import { MainPageSWRDto } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import useHomePage from 'views/Main/hook'
import Main from 'views/Main'

export default function HomePage({ fallbackData }: MainPageSWRDto): JSX.Element {
  const { data, error } = useHomePage(fallbackData)

  return (
    <Layout
      title={`${process.env.NEXT_PUBLIC_APP_NAME} • a social network for achieving goals`}
      description={`${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
      error={error}
      client={data?.client}
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
