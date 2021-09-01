import { Fragment, useState } from 'react'
import dynamic from 'next/dynamic'
import { differenceInDays } from 'date-fns'
import { createStyles, useTheme, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Goal, GoalCharacteristic } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import AppIconText from 'components/UI/AppIcon'
import GoalCardMenu from './GoalCardMenu'
import GoalCardDiscussion from './GoalCardDiscussion'

const GoalCardTask = dynamic(() => import('./GoalCardTask'))
const GoalCardTaskForm = dynamic(() => import('./GoalCardTaskForm'))
const GoalCardFeedback = dynamic(() => import('./GoalCardFeedback'))

const CHARACTERISTICS: GoalCharacteristic[] = ['motivation', 'creativity', 'support']

export interface GoalCardCurrentProps extends Goal {
  type: 'current'
}

export default function GoalCardCurrent({
  id,
  name,
  href,
  started,
  characteristics,
  tasks,
  feedback,
  role,
  discussion,
}: GoalCardCurrentProps): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const colors = useCharacteristicColors()
  const [rest, setRest] = useState(tasks.length - tasks.filter((t) => t.completed).length)
  const [feedbackExpand, setFeedbackExpand] = useState<'more' | 'less'>('more')
  const [discussionExpand, setDiscussionExpand] = useState<'more' | 'less'>('more')
  const days = differenceInDays(new Date(), Date.parse(started))
  const withForm = ['OWNER', 'MEMBER'].includes(role)

  return (
    <div className={classes.goalWrap} id={`goal-${id}`}>
      <AppBox flexDirection="column" spacing={3} className={classes.content}>
        <AppBox justifyContent="space-between">
          <AppHeader name="goal" variant="h6" component="h3">
            {name}
          </AppHeader>
          <GoalCardMenu title={name} href={href} role={role} />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristic) => (
            <CharacteristicCard
              type="goal"
              characteristic={characteristic}
              value={characteristics[characteristic]}
              color={colors[characteristic].fontColor}
              key={characteristic}
            />
          ))}
          <CharacteristicCard
            type="goal"
            characteristic="runs for days"
            value={days}
            color={theme.palette.text.disabled}
          />
        </AppBox>
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
                  rest={rest}
                  onSet={(completed) => setRest((r) => r + (completed ? -1 : 1))}
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
          {feedbackExpand === 'less' && <GoalCardFeedback {...feedback} />}
        </AppBox>
        <AppBox alignItems="center" spacing={1}>
          <AppHeader name="comment" variant="h6" component="h2" color="primary">
            Discussion {!discussion ? '' : <span className={classes.discussion}>{discussion}</span>}
          </AppHeader>
          <IconButton size="small" onClick={() => setDiscussionExpand(discussionExpand === 'more' ? 'less' : 'more')}>
            <AppIconText color="primary">expand_{discussionExpand}</AppIconText>
          </IconButton>
        </AppBox>
        {discussionExpand === 'less' && <GoalCardDiscussion discussion={discussion} role={role} />}
      </AppBox>
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    goalWrap: {
      padding: 2,
      background: `linear-gradient(to top left, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      borderRadius: 15,
    },
    content: {
      padding: 16,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    discussion: {
      color: '#99989D',
    },
  }),
)
