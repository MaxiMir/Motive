import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { createStyles, makeStyles } from '@material-ui/core'
import { ConfirmationDto, GoalCharacteristicName } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import useClient from 'hooks/useClient'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppDot from 'components/UI/AppDot'
import AppTooltip from 'components/UI/AppTooltip'
import Characteristic from 'components/Characteristic'
import { getGoalInfo } from './helper'

const AppTypography = dynamic(() => import('components/UI/AppTypography'))
const AppInView = dynamic(() => import('components/UI/AppInView'))
const Gallery = dynamic(() => import('components/Gallery'))
const Inheritance = dynamic(() => import('./components/Inheritance'))
const SecondPhotos = dynamic(() => import('./components/SecondPhotos'))
const Repeat = dynamic(() => import('./components/Repeat'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCompletedProps {
  tmpl: 'completed'
  confirmation: ConfirmationDto
  userId: number
  inView: boolean
  onView: () => void
}

export default function GoalCompleted({ confirmation, userId, inView, onView }: GoalCompletedProps): JSX.Element {
  const classes = useStyles()
  const { goal, owner, inherited } = confirmation
  const client = useClient()
  const colors = useCharacteristicColors()
  const { duration, mainPhoto, secondPhotos, interval } = getGoalInfo(confirmation)
  const isOwner = owner.id === client?.id
  const clientPage = userId === client?.id
  const renderRepeat = !clientPage && !isOwner

  return (
    <div className={classes.wrap}>
      <AppBox flexDirection="column" spacing={2} className={classes.content}>
        <AppBox flexDirection="column" spacing={1}>
          <AppTitle name="cup" variant="h6" component="h3">
            {goal.name}{' '}
            <span className={classes.runsForDays}>
              {' '}
              in <AppTooltip title={interval}>{duration}</AppTooltip>
            </span>
          </AppTitle>
          {inherited && <Inheritance owner={owner} />}
        </AppBox>
        {mainPhoto && <Gallery tmpl="simple" photos={[mainPhoto]} animation />}
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Fragment key={characteristicName}>
              <Characteristic
                tmpl="goal"
                name={characteristicName}
                value={goal.characteristic[characteristicName]}
                color={colors[characteristicName].fontColor}
              />
              {characteristicName !== 'members' && <AppDot />}
            </Fragment>
          ))}
        </AppBox>
        {confirmation.text && <AppTypography>{confirmation.text}</AppTypography>}
        {!!secondPhotos?.length && <SecondPhotos id={goal.id} photos={secondPhotos} />}
        {renderRepeat && <Repeat goalId={goal.id} />}
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
