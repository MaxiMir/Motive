import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, Card, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useUserContext } from '@modules/user/hooks'
import { MemberDto } from '@features/member'
import { GoalDto, GoalCharacteristicName } from '@features/goal'
import { MAIN_CHARACTERISTICS } from '@features/characteristic'
import { HashMark, getDayHref } from '@features/user'
import useClient from '@hooks/useClient'
import AppAccordion from '@ui/AppAccordion'
import CharacteristicGoal from '@components/Characteristic/CharacteristicGoal'
import { useMessages } from './hooks/useMessages'
import { useSwitchDay } from './hooks/useSwitchDay'
import { GoalContext } from './hooks/useGoalContext'
import {
  getGoalInfo,
  getClientOwnership,
  checkOnOpenDiscussion,
  redefineTasks,
  findMember,
} from './helper'
import ViewTrigger from './components/ViewTrigger'
import Calendar from './components/Calendar'
import MenuActions from './components/MenuActions'
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
  const userMember = findMember(id, membership, userId)
  const goalInfo = getGoalInfo(goal, clientOwnership, userMember)
  const dayHref = getDayHref(nickname, id, day.id)
  const showDiscussion = checkOnOpenDiscussion(query, id)
  const { isLoading, prev, next, onChangeDate, shouldDisableDate } = useSwitchDay(goal)
  const redefinedGoals = redefineTasks(day.tasks, userMember)
  const restGoals = redefinedGoals.length - redefinedGoals.filter((t) => t.completed).length // TODO backend

  // TODO Button

  return (
    <GoalContext.Provider value={goal}>
      <Box
        id={`goal-${id}`}
        display="flex"
        flexDirection="column"
        gap={2}
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
          sx={({ palette }) => ({
            padding: '3px',
            height: '100%',
            background: `linear-gradient(to top left, ${palette.motivation.main}, ${palette.creativity.dark}, ${palette.support.dark})`,
            borderRadius: '16px',
          })}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={2}
            sx={(theme) => ({
              position: 'relative',
              height: '100%',
              padding: theme.spacing(3, 2, 2),
              backgroundColor: 'underlay',
              borderRadius: '12px',
            })}
          >
            <ViewTrigger>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="subtitle1" component="h2">
                    <b>{name}</b>
                  </Typography>
                  {inherited && <Inheritance />}
                  <MenuActions title={name} href={dayHref} clientOwnership={clientOwnership} />
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
                        borderRadius: '12px 12px 0 0',
                        borderBottom: 'none',
                      }}
                      onClick={() => onChangeDate(prev)}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="baseline"
                        flex={1}
                        py={2}
                        px={3}
                      >
                        <DayAgo day={prev} />
                        <Date date={prev} />
                      </Box>
                    </DayCardControl>
                  )}
                  <Card
                    variant="outlined"
                    sx={{
                      width: '100%',
                      pb: 4,
                      borderRadius: '10px',
                      backgroundColor: '#121212',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={2}
                      px={3}
                    >
                      <DayAgo day={day.date} />
                      <Calendar
                        isLoading={isLoading}
                        onChangeDate={onChangeDate}
                        shouldDisableDate={shouldDisableDate}
                      />
                    </Box>
                    {!!stages.length && (
                      <AppAccordion
                        name="stage"
                        header={messages.stagesHeader}
                        id={`stage-${day.id}`}
                        defaultExpanded
                        details={
                          <Stages
                            forTomorrow={goalInfo.forTomorrow}
                            completeStage={goalInfo.completeStage}
                          />
                        }
                      />
                    )}
                    <AppAccordion
                      name="task"
                      header={messages.tasksHeader}
                      id={`tasksContent-${day.id}`}
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
                      defaultExpanded={!showDiscussion}
                      details={
                        <Feedback
                          forTomorrow={goalInfo.forTomorrow}
                          clientOwnership={clientOwnership}
                        />
                      }
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
                      defaultExpanded={showDiscussion}
                      details={
                        <Discussion
                          owner={owner}
                          count={day.topicCount}
                          clientGoal={clientOwnership.goal}
                        />
                      }
                    />
                  </Card>
                  {next && (
                    <DayCardControl
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: isLoading ? 'progress' : 'pointer',
                        borderRadius: '0 0 12px 12px',
                        borderTop: 'none',
                      }}
                      onClick={() => onChangeDate(next)}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="baseline"
                        flex={1}
                        py={2}
                        px={3}
                      >
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
                    <ViewerControl
                      owner={owner}
                      forTomorrow={goalInfo.forTomorrow}
                      clientOwnership={clientOwnership}
                    />
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

const DayCardControl = styled(Card)(({ theme }) => ({
  width: '90%',
  height: 50,
  background: theme.palette.grey[900],
  cursor: 'pointer',
  animation: 'opacity 1s ease-out',
  ':hover': {
    opacity: 0.7,
  },
}))

export default GoalCurrent
