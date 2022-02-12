import { Fragment, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { createStyles, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { UserBaseDto, GoalDto, GoalCharacteristicName } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import useChangeDay from './hook'
import { getGoalHref, getGoalInfo, getRole } from './helper'
import GoalDate from './components/GoalDate'
import Menu from './components/Menu'
import Characteristic from './components/Characteristic'
import Discussion from './components/Discussion'
import Views from './components/Views'

const Owner = dynamic(() => import('./components/Owner'))
const Stages = dynamic(() => import('./components/Stages'))
const Task = dynamic(() => import('./components/Task'))
const Feedback = dynamic(() => import('./components/Feedback'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const TaskForm = dynamic(() => import('./components/TaskForm'))
const Web = dynamic(() => import('./components/Web'))
const Reactions = dynamic(() => import('./components/Reactions'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCurrentProps {
  tmpl: 'current'
  goal: GoalDto
  href: string
  client?: UserBaseDto
}

export default function GoalCurrent({ goal, href, client }: GoalCurrentProps): JSX.Element {
  const { id, name, hashtags, characteristic, owner, stages, day } = goal
  const { id: dayID, date, tasks, views, feedback, topicCount } = day
  const classes = useStyles()
  const theme = useTheme()
  const colors = useCharacteristicColors()
  const datesMap = useMemo(getDatesMap, [date, dayID, goal.calendar])
  const [isLoading, onChangeDay] = useChangeDay(id)
  const role = getRole(goal, client)
  const goalHref = getGoalHref(href, goal)
  const { runsForDays, web, form, controls, completeStage, forTomorrow } = getGoalInfo(datesMap, goal, role)
  const rest = tasks.length - tasks.filter((t) => t.completed).length

  function getDatesMap() {
    if (!goal.calendar) {
      return { [date]: dayID }
    }

    return goal.calendar.reduce((acc, c) => ({ ...acc, [c.date]: c.id }), {})
  }

  return (
    <AppBox flexDirection="column" spacing={1} id={`goal-${id}`} className={classes.root}>
      <GoalDate datesMap={datesMap} date={date} isLoading={isLoading} onChangeDay={onChangeDay} />
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
              <Characteristic name="runs for days" value={runsForDays} color={theme.palette.text.disabled} />
            </AppBox>
            {!!hashtags?.length && <Hashtags hashtags={hashtags} />}
            <div>
              {!!stages.length && (
                <AppAccordion
                  name="stage"
                  header="Stages"
                  id={`stage-${dayID}`}
                  ariaControls="stages-content"
                  defaultExpanded
                  details={<Stages goal={goal} forTomorrow={forTomorrow} completeStage={completeStage} />}
                />
              )}
              <AppAccordion
                name="task"
                header="Tasks"
                id={`tasksContent-${dayID}`}
                ariaControls="tasks-content"
                defaultExpanded
                details={
                  <AppBox flexDirection="column" spacing={2}>
                    {tasks.map((task) => (
                      <Fragment key={task.id}>
                        {!form ? (
                          <Task task={task} />
                        ) : (
                          <TaskForm
                            goalID={id}
                            task={task}
                            rest={rest}
                            role={role}
                            client={client as UserBaseDto}
                            forTomorrow={forTomorrow}
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
                id={`feedbackContent-${dayID}`}
                ariaControls="feedback-content"
                details={!feedback ? <AppTypography>Coming soon...</AppTypography> : <Feedback feedback={feedback} />}
              />
              <AppAccordion
                name="discussion"
                header={<>Discussion {!topicCount ? '' : <span className={classes.topicCount}>{topicCount}</span>}</>}
                id={`discussionContent-${dayID}`}
                ariaControls="discussion-content"
                renderOnClick
                unmountOnExit
                detailsClass={classes.discussion}
                details={
                  <Discussion goalID={id} dayID={dayID} role={role} owner={owner} client={client} count={topicCount} />
                }
              />
            </div>
          </AppBox>
          <AppBox flexDirection="column" spacing={2}>
            {controls && <Reactions goal={goal} owner={owner} role={role} client={client} forTomorrow={forTomorrow} />}
            <Views views={views} />
          </AppBox>
          {web && <Web />}
        </AppBox>
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
      height: '100%',
      padding: 2,
      background: `linear-gradient(to top left, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      borderRadius: 15,
    },
    content: {
      position: 'relative',
      height: '100%',
      padding: 16,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    topicCount: {
      color: theme.text.silent,
    },
    discussion: {
      padding: '8px 0 16px 16px',
    },
  }),
)
