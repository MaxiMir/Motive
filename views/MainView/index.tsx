import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { Grid } from '@material-ui/core'
import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helper'

export default function MainView(): JSX.Element {
  const colors = useCharacteristicColors()

  return (
    <>
      <Slogan />
      <Grid container direction="column" style={{ flex: 1 }}>
        {ADVANTAGES.map((advantage) => (
          <Grid item xs key={advantage.name}>
            <Advantage {...advantage} color={colors[advantage.name]} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
