import { Fragment, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import produce from 'immer'
import differenceInDays from 'date-fns/differenceInDays'
import { createStyles, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Client, Goal, GoalCharacteristicName } from 'dto'
import GoalService from 'services/GoalService'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import useSend from 'hooks/useSend'
import useMutateGoals from 'hooks/useMutateGoals'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import { checkOnWeb, getGoalHref, getQueryNewState } from './helper'
import GoalDate from './components/GoalDate'
import Menu from './components/Menu'
import Characteristic from './components/Characteristic'
import Discussion from './components/Discussion'
import Reactions from './components/Reactions'

const Owner = dynamic(() => import('./components/Owner'))
const Task = dynamic(() => import('./components/Task'))
const Feedback = dynamic(() => import('./components/Feedback'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const TaskForm = dynamic(() => import('./components/TaskForm'))
const Web = dynamic(() => import('./components/Web'))
const Loader = dynamic(() => import('./components/Loader'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCurrentProps {
  type: 'current'
  goal: Goal
  client: Client
  href: string
}

export default function GoalCurrent({ goal, client, href }: GoalCurrentProps): JSX.Element {
  const currentDate = new Date()
  const { id, name, hashtags, started, characteristic, role, owner, day, datesMap } = goal
  const { id: dayId, date, tasks, feedbackId } = day
  const classes = useStyles()
  const theme = useTheme()
  const restRef = useRef(tasks.length - tasks.filter((t) => t.completed).length)
  const [goals, mutateGoals] = useMutateGoals()
  const colors = useCharacteristicColors()
  const [discussionCount, setDiscussionCount] = useState(day.discussionCount)
  const days = differenceInDays(currentDate, Date.parse(started))
  const showWeb = checkOnWeb(datesMap, date, currentDate)
  const goalHref = getGoalHref(href, goal)
  const withForm = ['OWNER', 'MEMBER'].includes(role)
  const { isLoading, send } = useSend(GoalService.getById, {
    onSuccess: (changedGoal) => {
      mutateGoals(
        produce(goals, (draft: Goal[]) => {
          draft[draft.findIndex((g) => g.id === goal.id)] = changedGoal
        }),
      )
      window.history.pushState(null, '', getQueryNewState(changedGoal))
    },
  })

  const onChangeDate = (newDayId: string) => send({ id: newDayId })

  return (
    <AppBox flexDirection="column" spacing={1} id={`goal-${id}`} className={classes.root}>
      <GoalDate date={date} datesMap={datesMap} onChangeDate={onChangeDate} />
      <div className={classes.wrap}>
        <AppBox flexDirection="column" justifyContent="space-between" spacing={3} className={classes.content}>
          <AppBox flexDirection="column" spacing={3}>
            <AppBox justifyContent="space-between" alignItems="center">
              <AppBox alignItems="center" spacing={1}>
                <AppHeader name="goal" variant="h6" component="h3">
                  {name}
                </AppHeader>
                {role === 'MEMBER' && <Owner {...owner} />}
              </AppBox>
              <Menu title={name} href={goalHref} role={role} />
            </AppBox>
            <AppBox justifyContent="space-between" alignItems="center">
              {CHARACTERISTICS.map((characteristicName) => (
                <Fragment key={characteristicName}>
                  <Characteristic
                    name={characteristicName}
                    value={characteristic[characteristicName]}
                    color={colors[characteristicName].fontColor}
                  />
                  <AppDot />
                </Fragment>
              ))}
              <Characteristic name="runs for days" value={days} color={theme.palette.text.disabled} />
            </AppBox>
            {hashtags?.length && <Hashtags hashtags={hashtags} />}
            <div>
              <AppAccordion
                name="task"
                header="Tasks"
                id={`tasksContent-${dayId}`}
                ariaControls="tasks-content"
                defaultExpanded
                details={
                  <AppBox flexDirection="column" spacing={2}>
                    {tasks.map((task) => (
                      <Fragment key={task.id}>
                        {!withForm ? (
                          <Task {...task} />
                        ) : (
                          <TaskForm
                            {...task}
                            rest={restRef.current}
                            onSet={(isCompleted) => {
                              restRef.current += isCompleted ? -1 : 1
                            }}
                          />
                        )}
                      </Fragment>
                    ))}
                  </AppBox>
                }
              />
              <AppAccordion
                name="feedback"
                header="Feedback"
                id={`feedbackContent-${dayId}`}
                ariaControls="feedback-content"
                renderOnClick
                unmountOnExit
                details={!feedbackId ? <AppTypography>Coming soon...</AppTypography> : <Feedback id={feedbackId} />}
              />
              <AppAccordion
                name="discussion"
                header={
                  <>
                    Discussion{' '}
                    {!discussionCount ? '' : <span className={classes.discussionCount}>{discussionCount}</span>}
                  </>
                }
                id={`discussionContent-${dayId}`}
                ariaControls="discussion-content"
                renderOnClick
                unmountOnExit
                detailsClass={classes.discussion}
                details={
                  <Discussion
                    dayId={dayId}
                    role={role}
                    owner={owner}
                    client={client}
                    count={discussionCount}
                    setDiscussionCount={setDiscussionCount}
                  />
                }
              />
            </div>
          </AppBox>
          <Reactions role={role} dayId={dayId} goal={goal} characteristic={day.characteristic} owner={owner} />
        </AppBox>
        {showWeb && <Web />}
        {isLoading && <Loader />}
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
    discussionCount: {
      color: theme.text.silent,
    },
    discussion: {
      padding: '8px 0 16px 16px',
    },
  }),
)
