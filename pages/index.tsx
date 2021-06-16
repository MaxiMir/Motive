import { FC } from 'react'
import { useTheme } from '@material-ui/core'
import { Layout } from 'layout'
import { AppIntro } from 'components/AppIntro'
import { Advantage } from 'components/Advantage'
import { AppBox } from 'components/UI/AppBox'

type Type = 'motivation' | 'creative' | 'support' | 'rating'

const ADVANTAGES = [
  {
    type: 'motivation',
    title: 'Be motivational',
    subtitle: 'for yourself and others',
  },
  {
    type: 'creative',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
  },
  {
    type: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
  },
  {
    type: 'rating',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
  },
]

const Home: FC = () => {
  const { palette } = useTheme()
  const colors = {
    motivation: {
      start: palette.warning.light,
      end: palette.warning.dark,
    },
    support: {
      start: palette.info.light,
      end: palette.info.dark,
    },
    creative: {
      start: palette.success.light,
      end: palette.success.dark,
    },
    rating: {
      start: '#BDB5B5',
      end: '#1D1D1F',
    },
  }

  return (
    <Layout withPadding={false}>
      <AppIntro />
      {ADVANTAGES.map((advantage, key) => {
        return (
          <AppBox style={{ height: 'calc((100vh - 290px ) / 4)' }} key={key}>
            <Advantage {...advantage} color={colors[advantage.type as Type]} />
          </AppBox>
        )
      })}
    </Layout>
  )
}

export default Home
