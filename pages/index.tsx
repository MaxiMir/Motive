import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { MainPageSWR } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import Promo from 'components/Promo'

export default function HomePage({ fallbackData }: MainPageSWR): JSX.Element {
  const { error } = useSWR('home', PageService.getMain, { fallbackData })

  // TODO get client

  return (
    <Layout title={process.env.NEXT_PUBLIC_APP_NAME} error={error} withVerticalPadding={false}>
      <Promo />
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
