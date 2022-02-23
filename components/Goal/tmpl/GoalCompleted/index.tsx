import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { GoalCharacteristicName, GoalCompletedDto, UserBaseDto } from 'dto'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppDot from 'components/UI/AppDot'
import Characteristic from 'components/Characteristic'
import { getGoalInfo } from './helper'

const AppTypography = dynamic(() => import('components/UI/AppTypography'))
const Gallery = dynamic(() => import('components/Gallery'))
const SecondPhotos = dynamic(() => import('./components/SecondPhotos'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCompletedProps {
  tmpl: 'completed'
  goal: GoalCompletedDto
  client?: UserBaseDto
  inView: boolean
  onView: () => void
}

export default function GoalCompleted({ goal, client }: GoalCompletedProps): JSX.Element {
  const classes = useStyles()
  const { name, characteristic, confirmation } = goal
  const colors = useCharacteristicColors()
  const { duration, mainPhoto, secondPhotos } = getGoalInfo(goal)
  console.log(client) // TODO

  return (
    <div className={classes.wrap}>
      <AppBox flexDirection="column" spacing={3} className={classes.content}>
        <AppHeader name="cup" variant="h6" component="h3">
          {name} <span className={classes.runsForDays}> in {duration}</span>
        </AppHeader>
        {mainPhoto && <Gallery photos={[mainPhoto]} animation />}
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Fragment key={characteristicName}>
              <Characteristic
                tmpl="goal"
                name={characteristicName}
                value={characteristic[characteristicName]}
                color={colors[characteristicName].fontColor}
              />
              {characteristicName !== 'members' && <AppDot />}
            </Fragment>
          ))}
        </AppBox>
        {confirmation.text && <AppTypography>{confirmation.text}</AppTypography>}
        {secondPhotos && <SecondPhotos id={goal.id} photos={secondPhotos} />}
      </AppBox>
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    wrap: {
      flex: 1,
      height: '100%',
      padding: 2,
      background: `linear-gradient(to top left, #fde76c, #813203, #ce8c00)`,
      borderRadius: 15,
    },
    content: {
      position: 'relative',
      height: '100%',
      padding: 16,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    runsForDays: {
      color: theme.palette.text.disabled,
    },
  }),
)
