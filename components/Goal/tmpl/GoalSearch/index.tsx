import { Button, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GoalCharacteristicName, GoalDto } from 'dto'
import AppBox from 'components/UI/AppBox'
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
      <AppBox flexDirection="column" alignItems="center" gap={2}>
        <Typography>{name}</Typography>
        <AppBox justifyContent="flex-start" flex={1}>
          <Typography variant="caption">Completed: +</Typography>
        </AppBox>
        <AppBox alignItems="center" gap={1}>
          <User tmpl="avatar" user={owner} />
          <Typography variant="caption">{owner.name}</Typography>
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
