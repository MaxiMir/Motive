import { makeStyles } from '@material-ui/core/styles'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helper'

interface MainViewProps {
  locale: Locale
}

export default function MainView({ locale }: MainViewProps): JSX.Element {
  const classes = useStyles()
  const colors = useCharacteristicColors()

  return (
    <>
      <Slogan locale={locale} />
      <AppBox flexDirection="column" className={classes.advantages} flex={1}>
        {ADVANTAGES.map((advantage) => (
          <Advantage {...advantage} color={colors[advantage.id]} locale={locale} key={advantage.id} />
        ))}
      </AppBox>
    </>
  )
}

const useStyles = makeStyles({
  advantages: {
    paddingBottom: 60,
  },
})
