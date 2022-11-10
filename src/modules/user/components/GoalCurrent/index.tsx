import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Box, useTheme } from '@mui/material'
import { GoalDto, GoalCharacteristicName, MemberDto, MAIN_CHARACTERISTICS } from '@dto'
import { getGoalWithDayHref, HashMark } from '@href'
import CharacteristicGoal from '@components/Characteristic/CharacteristicGoal'
import AppHeader from '@ui/AppHeader'
import AppAccordion from '@ui/AppAccordion'
import AppInView from '@ui/AppInView'
import { getMember } from '@modules/user/helper'
import { useIncreaseViews } from './hook'
import { getGoalInfo, getClientOwnership, checkOnShowDiscussion, redefineTasks } from './helper'
import Calendar from './components/Calendar'
import Menu from './components/Menu'
import Discussion from './components/Discussion'
import Views from './components/Views'
import Feedback from './components/Feedback'
import Task from './components/Task'

const Inheritance = dynamic(() => import('./components/Inheritance'))
const Stages = dynamic(() => import('./components/Stages'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const Web = dynamic(() => import('./components/Web'))
const ViewerControl = dynamic(() => import('./components/ViewerControl'))
const OwnerControl = dynamic(() => import('./components/OwnerControl'))

const CHARACTERISTICS: GoalCharacteristicName[] = [...MAIN_CHARACTERISTICS, 'members']

export interface GoalCurrentProps {
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
}: GoalCurrentProps) {
  const { id, name, hashtags, characteristic, owner, stages, day, inherited } = goal
  const { id: dayId, views, topicCount } = day
  const { formatMessage } = useIntl()
  const theme = useTheme()
  const { query } = useRouter()
  const clientOwnership = getClientOwnership(goal, clientId, clientPage, clientMembership)
  const userMember = getMember(id, userMembership, userId)
  const goalHref = getGoalWithDayHref(href, id, dayId)
  const goalInfo = getGoalInfo(goal, clientOwnership, userMember)
  const showDiscussion = checkOnShowDiscussion(query, id)
  const { mutate } = useIncreaseViews(goal, clientId)
  const stagesHeader = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const stagesAria = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const tasksHeader = formatMessage({ id: 'page.user.goal-current.tasks-header' })
  const tasksAria = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const feedbackHeader = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const feedbackAria = formatMessage({ id: 'page.user.goal-current.feedback-aria' })
  const discussionHeader = formatMessage({ id: 'page.user.goal-current.discussion-header' })
  const discussionAria = formatMessage({ id: 'page.user.goal-current.discussion-aria' })
  const redefinedGoals = redefineTasks(day.tasks, userMember)
  const restGoals = redefinedGoals.length - redefinedGoals.filter((t) => t.completed).length

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      id={`goal-${id}`}
      mt={2}
      sx={{
        flex: {
          xs: '0 1 100%',
          md: '0 1 calc(50% - 12px)',
        },
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          padding: '3px',
          height: '100%',
          background: `linear-gradient(to top left, ${theme.palette.motivation.main}, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
          borderRadius: '15px',
        }}
      >
        <Box
          display="flex"
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
          <AppInView triggerOnce onView={() => mutate()}>
            <Box display="flex" flexDirection="column" gap={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <AppHeader name="goal" variant="h6" component="h2">
                  <b>{name}</b>
                </AppHeader>
                <Menu goal={goal} title={name} href={goalHref} clientOwnership={clientOwnership} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {CHARACTERISTICS.map((characteristicName) => (
                  <CharacteristicGoal
                    name={characteristicName}
                    value={characteristic[characteristicName]}
                    key={characteristicName}
                  />
                ))}
                <CharacteristicGoal name="runningDays" value={goalInfo.runningDays} />
              </Box>
              {!!hashtags?.length && <Hashtags hashtags={hashtags} />}
              <Calendar goal={goal} />
              <Box>
                {!!stages.length && (
                  <AppAccordion
                    name="stage"
                    header={stagesHeader}
                    id={`stage-${dayId}`}
                    ariaControls={stagesAria}
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
                  ariaControls={tasksAria}
                  defaultExpanded
                  details={
                    <Box display="flex" flexDirection="column" gap={1}>
                      {redefinedGoals.map((task) => (
                        <Task
                          goalId={id}
                          task={task}
                          rest={restGoals}
                          clientMember={clientOwnership.member}
                          forTomorrow={goalInfo.forTomorrow}
                          daysGoneForOwner={goalInfo.daysGoneForOwner}
                          canEdit={goalInfo.canEdit}
                          key={task.id}
                        />
                      ))}
                    </Box>
                  }
                />
                <AppAccordion
                  name="feedback"
                  header={feedbackHeader}
                  id={`${HashMark.Feedback}-${id}`}
                  ariaControls={feedbackAria}
                  defaultExpanded={!showDiscussion}
                  details={
                    <Feedback goal={goal} forTomorrow={goalInfo.forTomorrow} clientOwnership={clientOwnership} />
                  }
                />
                <AppAccordion
                  name="discussion"
                  header={
                    <>
                      {discussionHeader}{' '}
                      <Box component="span" color="zen.silent">
                        {topicCount}
                      </Box>
                    </>
                  }
                  id={`${HashMark.Discussion}-${id}`}
                  ariaControls={discussionAria}
                  defaultExpanded={showDiscussion}
                  details={
                    <Discussion dayId={dayId} owner={owner} count={topicCount} clientGoal={clientOwnership.goal} />
                  }
                />
              </Box>
            </Box>
          </AppInView>
          <Box display="flex" flexDirection="column" gap={2}>
            {goalInfo.controls && (
              <>
                {clientOwnership.goal ? (
                  <OwnerControl goal={goal} />
                ) : (
                  <ViewerControl
                    goal={goal}
                    owner={owner}
                    forTomorrow={goalInfo.forTomorrow}
                    clientOwnership={clientOwnership}
                  />
                )}
              </>
            )}
            <Views views={views} />
          </Box>
          {goalInfo.web && <Web />}
        </Box>
      </Box>
    </Box>
  )
}