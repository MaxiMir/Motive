import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { ClientDto, GoalCharacteristicName, GoalCompletedDto } from 'dto'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { checkOnOwner } from 'components/Goal/helper'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppDot from 'components/UI/AppDot'
import AppTooltip from 'components/UI/AppTooltip'
import Characteristic from 'components/Characteristic'
import Repeat from './components/Repeat'
import { getGoalInfo } from './helper'

const AppTypography = dynamic(() => import('components/UI/AppTypography'))
const AppInView = dynamic(() => import('components/UI/AppInView'))
const Gallery = dynamic(() => import('components/Gallery'))
const SecondPhotos = dynamic(() => import('./components/SecondPhotos'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCompletedProps {
  tmpl: 'completed'
  goal: GoalCompletedDto
  client?: ClientDto
  inView: boolean
  onView: () => void
}

export default function GoalCompleted({ goal, client, inView, onView }: GoalCompletedProps): JSX.Element {
  const classes = useStyles()
  const { name, characteristic, confirmation, owner } = goal
  const colors = useCharacteristicColors()
  const isOwner = checkOnOwner(owner, client)
  const { duration, mainPhoto, secondPhotos, interval } = getGoalInfo(goal)

  return (
    <div className={classes.wrap}>
      <AppBox flexDirection="column" spacing={2} className={classes.content}>
        <AppTitle name="cup" variant="h6" component="h3">
          {name}{' '}
          <span className={classes.runsForDays}>
            {' '}
            in <AppTooltip title={interval}>{duration}</AppTooltip>
          </span>
        </AppTitle>
        {mainPhoto && <Gallery tmpl="simple" photos={[mainPhoto]} animation />}
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
        {!!secondPhotos?.length && <SecondPhotos id={goal.id} photos={secondPhotos} />}
        {!isOwner && <Repeat />}
      </AppBox>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    wrap: {
      flex: 1,
      height: '100%',
      marginTop: 8,
      padding: 2,
      background: `linear-gradient(to top left, #fde76c, #813203, #ce8c00)`,
      borderRadius: 15,
    },
    content: {
      position: 'relative',
      height: '100%',
      padding: 16,
      paddingBottom: 24,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    runsForDays: {
      color: theme.text.silent,
    },
  }),
)
