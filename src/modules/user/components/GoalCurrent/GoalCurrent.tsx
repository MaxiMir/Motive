import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, Card } from '@mui/material'
import { styled } from '@mui/system'
import { getGoalDayHref, HashMark } from '@href'
import { useUserContext } from '@modules/user/hooks'
import { MemberDto } from '@features/member'
import { GoalDto, GoalCharacteristicName } from '@features/goal'
import { MAIN_CHARACTERISTICS } from '@features/characteristic'
import useClient from '@hooks/useClient'
import AppHeader from '@ui/AppHeader'
import AppAccordion from '@ui/AppAccordion'
import CharacteristicGoal from '@components/Characteristic/CharacteristicGoal'
import { useSwitchDay, useMessages, GoalContext } from './hooks'
import { getGoalInfo, getClientOwnership, checkOnOpenDiscussion, redefineTasks, getMember } from './helper'
import ViewTrigger from './components/ViewTrigger'
import Calendar from './components/Calendar'
import Menu from './components/Menu'
import Discussion from './components/Discussion'
import Views from './components/Views'
import Feedback from './components/Feedback'
import Task from './components/Task'
import Date from './components/Date'
import DayAgo from './components/DayAgo'

const Inheritance = dynamic(() => import('./components/Inheritance'))
const Stages = dynamic(() => import('./components/Stages'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const Web = dynamic(() => import('./components/Web'))
const ViewerControl = dynamic(() => import('./components/ViewerControl'))
const OwnerControl = dynamic(() => import('./components/OwnerControl'))

const CHARACTERISTICS: GoalCharacteristicName[] = [...MAIN_CHARACTERISTICS, 'members']

interface GoalCurrentProps {
  goal: GoalDto
  membership: MemberDto[]
  clientPage: boolean
  clientMembership: MemberDto[]
}

function GoalCurrent({ goal, membership, clientPage, clientMembership }: GoalCurrentProps) {
  const { id, name, hashtags, characteristic, owner, stages, day, inherited } = goal
  const { query } = useRouter()
  const client = useClient()
  const messages = useMessages()
  const { id: userId, nickname } = useUserContext()
  const clientOwnership = getClientOwnership(goal, client?.id, clientPage, clientMembership)
  const userMember = getMember(id, membership, userId)
  const goalHref = getGoalDayHref(nickname, id, day.id)
  const goalInfo = getGoalInfo(goal, clientOwnership, userMember)
  const showDiscussion = checkOnOpenDiscussion(query, id)
  const { isLoading, prev, next, onChangeDate, shouldDisableDate } = useSwitchDay(goal)
  const redefinedGoals = redefineTasks(day.tasks, userMember)
  const restGoals = redefinedGoals.length - redefinedGoals.filter((t) => t.completed).length // TODO backend

  // TODO disabled control

  return (
    <GoalContext.Provider value={goal}>
      <Box
        id={`goal-${id}`}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={2}
        component="article"
        sx={{
          flex: {
            xs: '0 1 100%',
            md: '0 1 calc(50% - 12px)',
          },
          maxWidth: '100%',
        }}
      >
        <Box
          sx={(theme) => ({
            padding: '0.188rem',
            height: '100%',
            background: `linear-gradient(to top left, ${theme.palette.motivation.main}, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
            borderRadius: '1rem',
          })}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={3}
            sx={(theme) => ({
              position: 'relative',
              height: '100%',
              padding: '1.5rem 1rem 1rem',
              background: theme.palette.content,
              borderRadius: '0.813rem',
            })}
          >
            {inherited && <Inheritance />}
            <ViewTrigger>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <AppHeader name="goal" variant="h6" component="h2">
                    <b>{name}</b>
                  </AppHeader>
                  <Menu title={name} href={goalHref} clientOwnership={clientOwnership} />
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
                {!!hashtags.length && <Hashtags hashtags={hashtags} />}
                <Box display="flex" flexDirection="column" alignItems="center">
                  {prev && (
                    <DayCardControl
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: isLoading ? 'progress' : 'pointer',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      onClick={() => onChangeDate(prev)}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="baseline" flex={1} py={2} px={3}>
                        <DayAgo day={prev} />
                        <Date date={prev} />
                      </Box>
                    </DayCardControl>
                  )}
                  <Card variant="outlined" sx={{ width: '100%', pb: 4, borderRadius: '0.625rem' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" py={2} px={3}>
                      <DayAgo day={day.date} />
                      <Box display="flex" alignItems="center" gap={1}>
                        <Calendar
                          isLoading={isLoading}
                          onChangeDate={onChangeDate}
                          shouldDisableDate={shouldDisableDate}
                        />
                      </Box>
                    </Box>
                    {!!stages.length && (
                      <AppAccordion
                        name="stage"
                        header={messages.stagesHeader}
                        id={`stage-${day.id}`}
                        ariaControls={messages.stagesAria}
                        defaultExpanded
                        details={<Stages forTomorrow={goalInfo.forTomorrow} completeStage={goalInfo.completeStage} />}
                      />
                    )}
                    <AppAccordion
                      name="task"
                      header={messages.tasksHeader}
                      id={`tasksContent-${day.id}`}
                      ariaControls={messages.tasksAria}
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
                      header={messages.feedbackHeader}
                      id={`${HashMark.Feedback}-${id}`}
                      ariaControls={messages.feedbackAria}
                      defaultExpanded={!showDiscussion}
                      details={<Feedback forTomorrow={goalInfo.forTomorrow} clientOwnership={clientOwnership} />}
                    />
                    <AppAccordion
                      name="discussion"
                      header={
                        <>
                          {messages.discussionHeader}{' '}
                          <Box component="span" color="zen.silent">
                            {day.topicCount}
                          </Box>
                        </>
                      }
                      id={`${HashMark.Discussion}-${id}`}
                      ariaControls={messages.discussionAria}
                      defaultExpanded={showDiscussion}
                      details={<Discussion owner={owner} count={day.topicCount} clientGoal={clientOwnership.goal} />}
                    />
                  </Card>
                  {next && (
                    <DayCardControl
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: isLoading ? 'progress' : 'pointer',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                      }}
                      onClick={() => onChangeDate(next)}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="baseline" flex={1} py={2} px={3}>
                        <DayAgo day={next} />
                        <Date date={next} />
                      </Box>
                    </DayCardControl>
                  )}
                </Box>
              </Box>
            </ViewTrigger>
            <Box display="flex" flexDirection="column" gap={2}>
              {goalInfo.controls && (
                <>
                  {clientOwnership.goal ? (
                    <OwnerControl />
                  ) : (
                    <ViewerControl owner={owner} forTomorrow={goalInfo.forTomorrow} clientOwnership={clientOwnership} />
                  )}
                </>
              )}
              <Views />
            </Box>
            {goalInfo.web && <Web />}
          </Box>
        </Box>
      </Box>
    </GoalContext.Provider>
  )
}

const DayCardControl = styled(Card)({
  width: '90%',
  height: 50,
  background: '#2e2e2e',
  cursor: 'pointer',
  animation: 'opacity 1s ease-out',
  '&:hover': {
    opacity: 0.7,
  },
})

export default GoalCurrent
