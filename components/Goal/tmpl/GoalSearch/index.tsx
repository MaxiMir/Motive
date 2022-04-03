import { Button, makeStyles, useTheme } from '@material-ui/core'
import { GoalCharacteristicName, GoalDto } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import Characteristic from 'components/Characteristic'
import User from 'components/User'

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface GoalSearchProps {
  tmpl: 'search'
  goal: GoalDto
}

export default function GoalSearch({ goal }: GoalSearchProps): JSX.Element {
  const { name, characteristic, owner } = goal
  const theme = useTheme()
  const classes = useStyles()
  const colors = useCharacteristicColors()

  return (
    <Button variant="outlined" color="primary" href="#" className={classes.button}>
      <AppBox flexDirection="column" alignItems="center" spacing={2}>
        <AppTypography>{name}</AppTypography>
        <AppBox justifyContent="flex-start" flex={1}>
          <AppTypography variant="caption">Completed: +</AppTypography>
        </AppBox>
        <AppBox alignItems="center" spacing={1}>
          <User tmpl="avatar" user={owner} />
          <AppTypography variant="caption">{owner.name}</AppTypography>
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Characteristic
              tmpl="goal"
              name={characteristicName}
              value={characteristic[characteristicName]}
              color={colors[characteristicName].fontColor}
              key={characteristicName}
            />
          ))}
          <Characteristic tmpl="goal" name="runs for days" value={231} color={theme.palette.text.disabled} />
        </AppBox>
      </AppBox>
    </Button>
  )
}

const useStyles = makeStyles({
  button: {
    width: '100%',
    textTransform: 'none',
    padding: 16,
    borderRadius: 12,
  },
})
