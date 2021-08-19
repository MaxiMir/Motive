import { GetServerSideProps } from 'next'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import ROUTE from 'route'
import Axios from 'lib/axios'
import { Characteristic, MainPage } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
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
    href: ROUTE.RATING,
  },
  {
    characteristic: 'creativity',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
    href: `${ROUTE.RATING}?tab=1`,
  },
  {
    characteristic: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
    href: `${ROUTE.RATING}?tab=2`,
  },
  {
    characteristic: 'completed',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
    href: ROUTE.RATING,
  },
]

const queryFn = async () => (await Axios.get(ROUTE.INDEX)).data

export default function Home(): JSX.Element {
  const colors = useCharacteristicColors()
  const { data, status } = useQuery<MainPage>('index', queryFn)
  const { meta } = (data as MainPage) || {}

  return (
    <Layout status={status} withVerticalPadding={false} {...meta}>
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
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('index', queryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
