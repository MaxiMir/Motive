import { Fragment, useRef } from 'react'
import dynamic from 'next/dynamic'
import { differenceInDays } from 'date-fns'
import { createStyles, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Client, Goal, GoalCharacteristic, MainCharacteristic } from 'dto'
import { setQueryParams } from 'helpers/url'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import GoalDate from './components/GoalDate'
import Menu from './components/Menu'
import Characteristic from './components/Characteristic'
import Discussion from './components/Discussion'
import Reactions from './components/Reactions'
import Feedback from './components/Feedback'

const Owner = dynamic(() => import('./components/Owner'))
const Task = dynamic(() => import('./components/Task'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const TaskForm = dynamic(() => import('./components/TaskForm'))
const Web = dynamic(() => import('./components/Web'))

const CHARACTERISTICS: GoalCharacteristic[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCurrentProps {
  type: 'current'
  goal: Goal
  client: Client
  onChangeGoal: (goal: Goal) => void
}

const SHOW_WEB_AFTER_DAYS = 14

export default function GoalCurrent({ goal, client, onChangeGoal }: GoalCurrentProps): JSX.Element {
  const currentDate = new Date()
  const { id, name, hashtags, href, started, characteristics, role, owner, day, dates } = goal
  const { id: dayId, date, tasks, messageCount, characteristics: dayCharacteristics } = day
  const classes = useStyles()
  const theme = useTheme()
  const colors = useCharacteristicColors()
  const restRef = useRef(tasks.length - tasks.filter((t) => t.completed).length)
  const days = differenceInDays(currentDate, Date.parse(started))
  const showWeb = checkOnWeb()
  const hrefWithDate = setQueryParams(href, { date })
  const withForm = ['OWNER', 'MEMBER'].includes(role)

  const onChangeDate = async (newDate: string) => {
    console.log(newDate)
  }

  function checkOnWeb() {
    const isLastDate = dates[dates.length - 1].date === date
    return isLastDate && differenceInDays(currentDate, Date.parse(date)) >= SHOW_WEB_AFTER_DAYS
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
      <GoalDate date={date} dates={dates} onChangeDate={onChangeDate} />
      <div className={classes.wrap} id={`goal-${id}`}>
        <AppBox flexDirection="column" justifyContent="space-between" spacing={3} className={classes.content}>
          <AppBox flexDirection="column" spacing={3}>
            <AppBox justifyContent="space-between" alignItems="center">
              <AppBox alignItems="center" spacing={1}>
                <AppHeader name="goal" variant="h6" component="h3">
                  {name}
                </AppHeader>
                {role === 'MEMBER' && <Owner {...owner} />}
              </AppBox>
              <Menu title={name} href={hrefWithDate} role={role} />
            </AppBox>
            <AppBox justifyContent="space-between" alignItems="center">
              {CHARACTERISTICS.map((characteristic) => (
                <Fragment key={characteristic}>
                  <Characteristic
                    characteristic={characteristic}
                    value={characteristics[characteristic]}
                    color={colors[characteristic].fontColor}
                  />
                  <AppDot />
                </Fragment>
              ))}
              <Characteristic characteristic="runs for days" value={days} color={theme.palette.text.disabled} />
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
                    {tasks.map((task, index) => (
                      <Fragment key={index}>
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
                details={<Feedback dayId={dayId} />}
              />
              <AppAccordion
                name="discussion"
                header={
                  <>Discussion {!messageCount ? '' : <span className={classes.messageCount}>{messageCount}</span>}</>
                }
                id={`discussionContent-${dayId}`}
                ariaControls="discussion-content"
                renderOnClick
                unmountOnExit
                details={<Discussion dayId={dayId} role={role} owner={owner} client={client} count={messageCount} />}
              />
            </div>
          </AppBox>
          <Reactions
            role={role}
            dayId={dayId}
            characteristics={dayCharacteristics}
            client={client}
            owner={owner}
            onSetAction={onSetAction}
          />
        </AppBox>
        {showWeb && <Web />}
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
    messageCount: {
      color: '#99989D',
    },
  }),
)
