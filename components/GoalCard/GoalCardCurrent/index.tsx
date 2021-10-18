import { Fragment, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { differenceInDays } from 'date-fns'
import { createStyles, useTheme, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Client, Goal, GoalCharacteristic, MainCharacteristic } from 'dto'
import { setQueryParams } from 'helpers/url'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import AppIconText from 'components/UI/AppIcon'
import AppDot from 'components/UI/AppDot'
import GoalCardDate from './GoalCardDate'
import GoalCardMenu from './GoalCardMenu'
import GoalCardDiscussion from './GoalCardDiscussion'
import GoalCardActions from './GoalCardActions'

const GoalCardOwner = dynamic(() => import('./GoalCardOwner'))
const GoalCardTask = dynamic(() => import('./GoalCardTask'))
const GoalCardHashtags = dynamic(() => import('./GoalCardHashtags'))
const GoalCardTaskForm = dynamic(() => import('./GoalCardTaskForm'))
const GoalCardFeedback = dynamic(() => import('./GoalCardFeedback'))
const GoalCardWeb = dynamic(() => import('./GoalCardWeb'))

const CHARACTERISTICS: GoalCharacteristic[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCardCurrentProps {
  type: 'current'
  goal: Goal
  client: Client
  onChangeGoal: (goal: Goal) => void
}

const SHOW_WEB_AFTER_DAYS = 14

export default function GoalCardCurrent({ goal, client, onChangeGoal }: GoalCardCurrentProps): JSX.Element {
  const currentDate = new Date()
  const { id, name, hashtags, href, started, characteristics, role, owner, day, dates } = goal
  const { date, tasks, feedback, discussion, characteristics: dayCharacteristics } = day
  const classes = useStyles()
  const theme = useTheme()
  const colors = useCharacteristicColors()
  const restRef = useRef(tasks.length - tasks.filter((t) => t.completed).length)
  const [feedbackExpand, setFeedbackExpand] = useState<'more' | 'less'>('more')
  const [discussionExpand, setDiscussionExpand] = useState<'more' | 'less'>('more')
  const days = differenceInDays(currentDate, Date.parse(started))
  const showWeb = differenceInDays(currentDate, Date.parse(date)) >= SHOW_WEB_AFTER_DAYS
  const hrefWithDate = setQueryParams(href, { date })
  const withForm = ['OWNER', 'MEMBER'].includes(role)
  const showFeedback = feedbackExpand === 'less'
  const showDiscussion = discussionExpand === 'less'

  const onChangeDate = async (newDate: string) => {
    console.log(newDate)
  }

  const onSetAction = (characteristic: MainCharacteristic, increase: boolean) => {
    onChangeGoal({
      ...goal,
      characteristics: {
        ...goal.characteristics,
        [characteristic]: goal.characteristics[characteristic] + (increase ? 1 : -1),
      },
    })
  }

  return (
    <AppBox flexDirection="column" spacing={1} className={classes.root}>
      <GoalCardDate date={date} dates={dates} onChangeDate={onChangeDate} />
      <div className={classes.wrap} id={`goal-${id}`}>
        <AppBox flexDirection="column" justifyContent="space-between" spacing={3} className={classes.content}>
          <AppBox flexDirection="column" spacing={3}>
            <AppBox justifyContent="space-between" alignItems="center">
              <AppBox alignItems="center" spacing={1}>
                <AppHeader name="goal" variant="h6" component="h3">
                  {name}
                </AppHeader>
                {role === 'MEMBER' && <GoalCardOwner {...owner} />}
              </AppBox>
              <GoalCardMenu title={name} href={hrefWithDate} role={role} />
            </AppBox>
            <AppBox justifyContent="space-between" alignItems="center">
              {CHARACTERISTICS.map((characteristic) => (
                <Fragment key={characteristic}>
                  <CharacteristicCard
                    type="goal"
                    characteristic={characteristic}
                    value={characteristics[characteristic]}
                    color={colors[characteristic].fontColor}
                  />
                  <AppDot />
                </Fragment>
              ))}
              <CharacteristicCard
                type="goal"
                characteristic="runs for days"
                value={days}
                color={theme.palette.text.disabled}
              />
            </AppBox>
            {hashtags?.length && <GoalCardHashtags hashtags={hashtags} />}
            <AppBox flexDirection="column" spacing={1}>
              <AppHeader name="task" variant="h6" component="h2" color="primary">
                Tasks
              </AppHeader>
              {tasks.map((task, index) => (
                <Fragment key={index}>
                  {!withForm ? (
                    <GoalCardTask {...task} />
                  ) : (
                    <GoalCardTaskForm
                      {...task}
                      rest={restRef.current}
                      onSet={(completed) => {
                        restRef.current += completed ? -1 : 1
                      }}
                    />
                  )}
                </Fragment>
              ))}
            </AppBox>
            <AppBox flexDirection="column" spacing={1}>
              <AppBox alignItems="center" spacing={1}>
                <AppHeader name="feedback" variant="h6" component="h2" color="primary">
                  Feedback
                </AppHeader>
                <IconButton size="small" onClick={() => setFeedbackExpand(feedbackExpand === 'more' ? 'less' : 'more')}>
                  <AppIconText color="primary">expand_{feedbackExpand}</AppIconText>
                </IconButton>
              </AppBox>
              {showFeedback && <GoalCardFeedback {...feedback} />}
            </AppBox>
            <AppBox alignItems="center" spacing={1}>
              <AppHeader name="comment" variant="h6" component="h2" color="primary">
                Discussion {!discussion ? '' : <span className={classes.discussion}>{discussion}</span>}
              </AppHeader>
              <IconButton
                size="small"
                onClick={() => setDiscussionExpand(discussionExpand === 'more' ? 'less' : 'more')}
              >
                <AppIconText color="primary">expand_{discussionExpand}</AppIconText>
              </IconButton>
            </AppBox>
            {showDiscussion && <GoalCardDiscussion discussion={discussion} role={role} />}
          </AppBox>
          <GoalCardActions
            role={role}
            dayId={day.id}
            characteristics={dayCharacteristics}
            client={client}
            onSetAction={onSetAction}
          />
        </AppBox>
        {showWeb && <GoalCardWeb />}
      </div>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: '0 0 100%',
      [theme.breakpoints.up('md')]: {
        flex: '1 1 calc(50% - 12px)',
        flexGrow: 0,
      },
    },
    wrap: {
      position: 'relative',
      height: '100%',
      padding: 2,
      background: `linear-gradient(to top left, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      borderRadius: 15,
    },
    content: {
      height: '100%',
      padding: 16,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    discussion: {
      color: '#99989D',
    },
  }),
)
