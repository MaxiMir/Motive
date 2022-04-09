import { Fragment, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material'
import { GoalDto, GoalCharacteristicName, MemberDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Characteristic from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTitle from 'components/UI/AppTitle'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import { useIncreaseViews } from './hook'
import { getMember, getGoalHref, getGoalInfo, redefineTasks, getClientOwnership } from './helper'
import Calendar from './components/Calendar'
import Menu from './components/Menu'
import Discussion from './components/Discussion'
import Views from './components/Views'
import Task from './components/Task'
import i18n from './i18n'

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
  const { id: dayId, tasks, views, feedback, topicCount } = day
  const theme = useTheme()
  const { locale } = useLocale()
  const userMember = getMember(goal, userMembership, userId)
  const clientOwnership = getClientOwnership(goal, clientId, clientPage, clientMembership)
  const goalHref = getGoalHref(href, goal)
  const goalInfo = useMemo(() => getGoalInfo(goal, clientOwnership), [goal, clientOwnership])
  const redefinedGoals = redefineTasks(tasks, userMember)
  const rest = redefinedGoals.length - redefinedGoals.filter((t) => t.completed).length
  const { stagesHeader, tasksHeader, soon, feedbackHeader, discussionHeader } = i18n[locale]

  useIncreaseViews(goal, clientId)

  return (
    <AppBox
      flexDirection="column"
      gap={2}
      id={`goal-${id}`}
      mt={2}
      sx={{
        flex: {
          xs: '0 0 100%',
          md: '1 1 calc(50% - 12px)',
        },
        flexGrow: {
          xs: 1,
          md: 0,
        },
      }}
    >
      <AppBox
        display={undefined}
        sx={{
          padding: '3px',
          height: '100%',
          background: `linear-gradient(to top left, ${theme.palette.motivation.main}, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
          borderRadius: '15px',
        }}
      >
        <AppBox
          flexDirection="column"
          justifyContent="space-between"
          gap={3}
          sx={{
            position: 'relative',
            height: '100%',
            padding: '24px 16px 16px',
            background: theme.palette.content,
            borderRadius: '13px',
          }}
        >
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
                  <Characteristic tmpl="goal" name={characteristicName} value={characteristic[characteristicName]} />
                  <AppDot />
                </Fragment>
              ))}
              <Characteristic tmpl="goal" name="runningDays" value={goalInfo.daysPassed} />
            </AppBox>
            {!!hashtags?.length && <Hashtags hashtags={hashtags} />}
            <Calendar goal={goal} />
            <div>
              {!!stages.length && (
                <AppAccordion
                  name="stage"
                  header={stagesHeader}
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
                header={tasksHeader}
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
                header={feedbackHeader}
                id={`feedbackContent-${dayId}`}
                ariaControls="feedback-content"
                defaultExpanded={!!feedback}
                details={!feedback ? <Typography>{soon}</Typography> : <Feedback feedback={feedback} />}
              />
              <AppAccordion
                name="discussion"
                header={
                  <>
                    {discussionHeader}{' '}
                    <AppBox display={undefined} component="span" color="zen.silent">
                      {topicCount}
                    </AppBox>
                  </>
                }
                id={`discussionContent-${dayId}`}
                ariaControls="discussion-content"
                renderOnClick
                unmountOnExit
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
      </AppBox>
    </AppBox>
  )
}
