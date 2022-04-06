import { Fragment, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, GoalCharacteristicName, MemberDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppTitle from 'components/UI/AppTitle'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import Characteristic from 'components/Characteristic'
import { useIncreaseViews } from './hook'
import { getMember, getGoalHref, getGoalInfo, redefineTasks, getClientOwnership } from './helper'
import Calendar from './components/Calendar'
import Menu from './components/Menu'
import Discussion from './components/Discussion'
import Views from './components/Views'
import Task from './components/Task'

const Typography = dynamic(() => import('@mui/material/Typography'))
const Inheritance = dynamic(() => import('./components/Inheritance'))
const Stages = dynamic(() => import('./components/Stages'))
const Feedback = dynamic(() => import('./components/Feedback'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const Web = dynamic(() => import('./components/Web'))
const Actions = dynamic(() => import('./components/Actions'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCurrentProps {
  tmpl: 'current'
  goal: GoalDto
  href: string
  userId: number
  userMembership: MemberDto[]
  clientId?: number
  clientPage: boolean
  clientMembership: MemberDto[]
}

export default function GoalCurrent({
  goal,
  href,
  userId,
  userMembership,
  clientId,
  clientPage,
  clientMembership,
}: GoalCurrentProps): JSX.Element {
  const { id, name, hashtags, characteristic, owner, stages, day, inherited } = goal
  const { id: dayId, date, tasks, views, feedback, topicCount } = day
  const theme = useTheme()
  const classes = useStyles()
  const colors = useCharacteristicColors()
  const userMember = getMember(goal, userMembership, userId)
  const clientOwnership = getClientOwnership(goal, clientId, clientPage, clientMembership)
  const goalHref = getGoalHref(href, goal)
  const goalInfo = useMemo(() => getGoalInfo(goal, clientOwnership), [goal, clientOwnership])
  const redefinedGoals = redefineTasks(tasks, userMember)
  const rest = redefinedGoals.length - redefinedGoals.filter((t) => t.completed).length

  useIncreaseViews(goal, clientId)

  return (
    <AppBox flexDirection="column" gap={2} id={`goal-${id}`} className={classes.root} mt={2}>
      <div className={classes.wrap}>
        <AppBox flexDirection="column" justifyContent="space-between" gap={3} className={classes.content}>
          {inherited && <Inheritance owner={owner} />}
          <AppBox flexDirection="column" gap={3}>
            <AppBox justifyContent="space-between" alignItems="center">
              <AppTitle name="goal" variant="h6" component="h3">
                <b>{name}</b>
              </AppTitle>
              <Menu goal={goal} title={name} href={goalHref} clientOwnership={clientOwnership} />
            </AppBox>
            <AppBox justifyContent="space-between" alignItems="center">
              {CHARACTERISTICS.map((characteristicName) => (
                <Fragment key={characteristicName}>
                  <Characteristic
                    tmpl="goal"
                    name={characteristicName}
                    value={characteristic[characteristicName]}
                    color={colors[characteristicName].fontColor}
                  />
                  <AppDot />
                </Fragment>
              ))}
              <Characteristic
                tmpl="goal"
                name="runs for days"
                value={goalInfo.runsForDays}
                color={theme.palette.text.disabled}
              />
            </AppBox>
            {!!hashtags?.length && <Hashtags hashtags={hashtags} />}
            <Calendar goalId={id} datesMap={goalInfo.datesMap} current={date} />
            <div>
              {!!stages.length && (
                <AppAccordion
                  name="stage"
                  header="Stages"
                  id={`stage-${dayId}`}
                  ariaControls="stages-content"
                  defaultExpanded
                  details={
                    <Stages goal={goal} forTomorrow={goalInfo.forTomorrow} completeStage={goalInfo.completeStage} />
                  }
                />
              )}
              <AppAccordion
                name="task"
                header="Tasks"
                id={`tasksContent-${dayId}`}
                ariaControls="tasks-content"
                defaultExpanded
                details={
                  <AppBox flexDirection="column" gap={1}>
                    {redefinedGoals.map((task) => (
                      <Task
                        goalId={id}
                        task={task}
                        rest={rest}
                        goalInfo={goalInfo}
                        clientMember={clientOwnership.member}
                        key={task.id}
                      />
                    ))}
                  </AppBox>
                }
              />
              <AppAccordion
                name="feedback"
                header="Feedback"
                id={`feedbackContent-${dayId}`}
                ariaControls="feedback-content"
                defaultExpanded={!!feedback}
                details={!feedback ? <Typography>Coming soon...</Typography> : <Feedback feedback={feedback} />}
              />
              <AppAccordion
                name="discussion"
                header={<>Discussion {!topicCount ? '' : <span className={classes.topicCount}>{topicCount}</span>}</>}
                id={`discussionContent-${dayId}`}
                ariaControls="discussion-content"
                renderOnClick
                unmountOnExit
                detailsClass={classes.discussion}
                details={
                  <Discussion dayId={dayId} owner={owner} count={topicCount} clientGoal={clientOwnership.goal} />
                }
              />
            </div>
          </AppBox>
          <AppBox flexDirection="column" gap={2}>
            {goalInfo.controls && (
              <Actions goal={goal} owner={owner} forTomorrow={goalInfo.forTomorrow} clientOwnership={clientOwnership} />
            )}
            <Views views={views} />
          </AppBox>
          {goalInfo.web && <Web />}
        </AppBox>
      </div>
    </AppBox>
  )
}

const useStyles = makeStyles((theme: Theme) =>
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
      background: `linear-gradient(to top left, ${theme.characteristic.motivation.main}, ${theme.characteristic.creativity.dark}, ${theme.characteristic.support.dark})`,
      borderRadius: 15,
    },
    content: {
      position: 'relative',
      height: '100%',
      padding: '24px 16px 16px',
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    topicCount: {
      color: theme.text.silent,
    },
    calendar: {
      padding: '8px 0 16px 0',
    },
    discussion: {
      padding: '8px 0 16px 16px',
    },
  }),
)
