import { Fragment } from 'react'
import { differenceInDays } from 'date-fns'
import { createStyles, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GoalCharacteristic, Goal } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import CharacteristicGoal from 'components/Characteristic/CharacteristicGoal'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import GoalCardMenu from './GoalCardMenu'

const CHARACTERISTICS: GoalCharacteristic[] = ['motivation', 'creativity', 'support']

export default function GoalCardCurrent({ id, name, href, started, characteristics }: Goal): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const colors = useCharacteristicColors()
  const days = differenceInDays(new Date(), Date.parse(started))

  return (
    <div className={classes.goalWrap} id={`goal-${id}`}>
      <AppBox flexDirection="column" spacing={4} className={classes.content}>
        <AppBox justifyContent="space-between">
          <AppHeader name="goal" variant="h6" component="h3">
            {name}
          </AppHeader>
          <GoalCardMenu title={name} href={href} />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristic) => (
            <Fragment key={characteristic}>
              <CharacteristicGoal
                characteristic={characteristic}
                value={characteristics[characteristic]}
                color={colors[characteristic].fontColor}
              />
            </Fragment>
          ))}
          <CharacteristicGoal characteristic="duration" value={days} color={theme.palette.text.disabled} />
        </AppBox>
      </AppBox>
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    goalWrap: {
      maxWidth: 350,
      padding: 2,
      background: `linear-gradient(to top left, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      borderRadius: 15,
    },
    content: {
      padding: 16,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
  }),
)
