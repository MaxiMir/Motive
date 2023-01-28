import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CharacteristicGoal } from 'entities/characteristic'
import { GoalContext } from 'entities/goal'
import { useUserContext, getDayHref, useClient } from 'entities/user'
import { MAIN_CHARACTERISTICS, GoalCharacteristicName, GoalDto, MemberDto } from 'shared/api'
import { HashMark } from 'shared/config'
import Accordion from 'shared/ui/Accordion'
import Calendar from './components/Calendar'
import Date from './components/Date'
import DayAgo from './components/DayAgo'
import Discussion from './components/Discussion'
import Feedback from './components/Feedback'
import MenuActions from './components/MenuActions'
import Task from './components/Task'
import Views from './components/Views'
import ViewTrigger from './components/ViewTrigger'
import {
  getGoalInfo,
  getClientOwnership,
  checkOnOpenDiscussion,
  redefineTasks,
  findMember,
} from './helper'
import { useMessages } from './hooks/useMessages'
import { useSwitchDay } from './hooks/useSwitchDay'

const Inheritance = dynamic(() => import('./components/Inheritance'))
const Stages = dynamic(() => import('./components/Stages'))
const Hashtags = dynamic(() => import('./components/Hashtags'))
const Web = dynamic(() => import('./components/Web'))
const ViewerControl = dynamic(() => import('./components/ViewerControl'))
const OwnerControl = dynamic(() => import('./components/ownerControl'))

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

  const onClickPrevDay = () => onChangeDate(prev)

  const onClickNextDay = () => onChangeDate(next)

  return (
    <GoalContext.Provider value={goal}>
      <Stack
        id={`goal-${id}`}
        component="article"
        spacing={2}
        flex={{
          xs: '0 1 100%',
          md: '0 1 calc(50% - 12px)',
        }}
        maxWidth="100%"
      >
        <Box
          padding="3px"
          height="100%"
          borderRadius="16px"
          sx={({ palette }) => ({
            background: `linear-gradient(to top left, ${palette.motivation.main}, ${palette.creativity.dark}, ${palette.support.dark})`,
          })}
        >
          <Stack
            justifyContent="space-between"
            spacing={2}
            position="relative"
            height="100%"
            sx={({ spacing }) => ({
              padding: spacing(3, 2, 2),
              backgroundColor: 'underlay',
              borderRadius: '12px',
            })}
          >
            <ViewTrigger>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="subtitle1" component="h2">
                    <b>{name}</b>
                  </Typography>
                  {inherited && <Inheritance />}
                  <MenuActions title={name} href={dayHref} clientOwnership={clientOwnership} />
                </Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  {CHARACTERISTICS.map((characteristicName) => (
                    <CharacteristicGoal
                      name={characteristicName}
                      value={characteristic[characteristicName]}
                      key={characteristicName}
                    />
                  ))}
                  <CharacteristicGoal name="runningDays" value={goalInfo.runningDays} />
                </Stack>
                {!!hashtags.length && <Hashtags hashtags={hashtags} />}
                <Stack alignItems="center">
                  {prev && (
                    <DayCardButton
                      variant="text"
                      disabled={isLoading}
                      aria-label={messages.prevDayText}
                      sx={{
                        borderRadius: '12px 12px 0 0',
                        borderBottom: 'none',
                      }}
                      onClick={onClickPrevDay}
                    >
                      <DayAgo day={prev} />
                      <Date date={prev} />
                    </DayCardButton>
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
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flex={1}
                      p={2}
                    >
                      <DayAgo day={day.date} />
                      <Calendar
                        isLoading={isLoading}
                        onChangeDate={onChangeDate}
                        shouldDisableDate={shouldDisableDate}
                      />
                    </Stack>
                    {!!stages.length && (
                      <Accordion
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
                    <Accordion
                      name="task"
                      header={messages.tasksHeader}
                      id={`tasksContent-${day.id}`}
                      defaultExpanded
                      details={
                        <Stack spacing={1}>
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
                        </Stack>
                      }
                    />
                    <Accordion
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
                    <Accordion
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
                    <DayCardButton
                      variant="text"
                      disabled={isLoading}
                      aria-label={messages.nextDayText}
                      sx={{
                        borderRadius: '0 0 12px 12px',
                        borderTop: 'none',
                      }}
                      onClick={onClickNextDay}
                    >
                      <DayAgo day={next} />
                      <Date date={next} />
                    </DayCardButton>
                  )}
                </Stack>
              </Stack>
            </ViewTrigger>
            <Stack spacing={2}>
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
            </Stack>
            {goalInfo.web && <Web />}
          </Stack>
        </Box>
      </Stack>
    </GoalContext.Provider>
  )
}

const DayCardButton = styled(Button)(({ theme }) => ({
  width: '90%',
  height: 50,
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  border: '1px solid rgba(255, 255, 255, 0.12)',
}))

export default GoalCurrent
