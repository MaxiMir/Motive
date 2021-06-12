import { FC } from 'react'
import { useTheme } from '@material-ui/core'
import { Layout } from 'layout'
import { AppIntro } from 'components/AppIntro'
import { Advantage } from 'components/Advantage'
import { AppBox } from 'components/UI/AppBox'

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

  return (
    <Layout>
      <AppIntro />
      {ADVANTAGES.map((advantage, key) => {
        const colors = {
          motivation: palette.warning,
          support: palette.info,
          creative: palette.success,
          rating: {
            light: '#BDB5B5',
            main: '',
            dark: '#1D1D1F',
          },
        }

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
