import { FC } from 'react'
import { CharacteristicType } from 'dto'
import { useCharacteristicColor } from 'hook/useCharacteristicColor'
import Layout from 'layout'
import { Slogan } from 'components/Slogan'
import { Advantage } from 'components/Advantage'
import AppBox from 'components/UI/AppBox'

interface AdvantageItem {
  type: CharacteristicType
  title: string
  subtitle: string
}

const ADVANTAGES: AdvantageItem[] = [
  {
    type: 'motivation',
    title: 'Be motivational',
    subtitle: 'for yourself and others',
  },
  {
    type: 'creativity',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
  },
  {
    type: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
  },
  {
    type: 'completed',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
  },
]

const Home: FC = () => {
  const colors = useCharacteristicColor()

  return (
    <Layout withPadding={false}>
      <Slogan />
      {ADVANTAGES.map((advantage, key) => {
        return (
          <AppBox style={{ height: 'calc((100vh - 290px ) / 4)' }} key={key}>
            <Advantage {...advantage} color={colors[advantage.type]} />
          </AppBox>
        )
      })}
    </Layout>
  )
}

export default Home
