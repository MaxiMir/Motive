import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import { makeStyles } from '@material-ui/core/styles'
import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helper'

export default function MainView(): JSX.Element {
  const classes = useStyles()
  const colors = useCharacteristicColors()

  return (
    <>
      <Slogan />
      <AppBox flexDirection="column" className={classes.advantages} flex={1}>
        {ADVANTAGES.map((advantage) => (
          <Advantage {...advantage} color={colors[advantage.name]} key={advantage.name} />
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
