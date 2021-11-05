import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { MainPage, PageSWR } from 'dto'
import PageService from 'services/PageService'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import Layout from 'layout'
import AppBox from 'components/UI/AppBox'
import { ADVANTAGES } from './home/helper'
import Slogan from './home/Slogan'
import Advantage from './home/Advantage'

export default function Home({ fallbackData }: PageSWR<MainPage>): JSX.Element {
  const colors = useCharacteristicColors()
  const { data, error } = useSWR('home', PageService.getMain, { fallbackData })
  const { meta, client } = (data as MainPage) || {}

  return (
    <Layout client={client} error={error} withVerticalPadding={false} {...meta}>
      <Slogan />
      {ADVANTAGES.map((advantage) => (
        <AppBox style={{ height: 'calc((100vh - 290px ) / 4)' }} key={advantage.characteristic}>
          <Advantage {...advantage} color={colors[advantage.characteristic]} />
        </AppBox>
      ))}
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
