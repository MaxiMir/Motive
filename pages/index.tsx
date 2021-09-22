import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { RATING_ROUTE } from 'route'
import { Characteristic, MainPage, PageSWR } from 'dto'
import PageService from 'services/PageService'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { setQueryParams } from 'helpers/url'
import Layout from 'layout'
import Slogan from 'components/Slogan'
import Advantage from 'components/Advantage'
import AppBox from 'components/UI/AppBox'

interface AdvantageItem {
  characteristic: Characteristic
  title: string
  subtitle: string
  href: string
}

const ADVANTAGES: AdvantageItem[] = [
  {
    characteristic: 'motivation',
    title: 'Be motivational',
    subtitle: 'for yourself and others',
    href: RATING_ROUTE,
  },
  {
    characteristic: 'creativity',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
    href: setQueryParams(RATING_ROUTE, { tab: '1' }),
  },
  {
    characteristic: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
    href: setQueryParams(RATING_ROUTE, { tab: '2' }),
  },
  {
    characteristic: 'completed',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
    href: RATING_ROUTE,
  },
]

export default function Home({ fallbackData }: PageSWR<MainPage>): JSX.Element {
  const colors = useCharacteristicColors()
  const { data, error } = useSWR('home', PageService.getMain, { fallbackData })
  const { meta, client } = (data as MainPage) || {}

  return (
    <Layout client={client} error={error} withVerticalPadding={false} withHistory={false} {...meta}>
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
