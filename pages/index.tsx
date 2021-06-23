import { Characteristic } from 'dto'
import { useCharacteristicColor } from 'hook/useCharacteristicColor'
import Layout from 'layout'
import { Slogan } from 'components/Slogan'
import { Advantage } from 'components/Advantage'
import AppBox from 'components/UI/AppBox'

interface AdvantageItem {
  characteristic: Characteristic
  title: string
  subtitle: string
}

const Home = () => {
  const colors = useCharacteristicColor()

  return (
    <Layout withVerticalPadding={false}>
      <Slogan />
      {ADVANTAGES.map((advantage, key) => {
        return (
          <AppBox style={{ height: 'calc((100vh - 290px ) / 4)' }} key={key}>
            <Advantage
              {...advantage}
              color={colors[advantage.characteristic]}
            />
          </AppBox>
        )
      })}
    </Layout>
  )
}

const ADVANTAGES: AdvantageItem[] = [
  {
    characteristic: 'motivation',
    title: 'Be motivational',
    subtitle: 'for yourself and others',
  },
  {
    characteristic: 'creativity',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
  },
  {
    characteristic: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
  },
  {
    characteristic: 'completed',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
  },
]

export default Home
