import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { MainPage, PageSWR } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import Promo from 'components/Promo'

export default function Home({ fallbackData }: PageSWR<MainPage>): JSX.Element {
  const { data, error } = useSWR('home', PageService.getMain, { fallbackData })
  const { meta, client } = (data as MainPage) || {}

  return (
    <Layout client={client} error={error} withVerticalPadding={false} {...meta}>
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
