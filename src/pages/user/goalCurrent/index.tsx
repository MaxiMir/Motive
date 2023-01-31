import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CharacteristicGoal } from 'entities/characteristic'
import { getDayHref } from 'entities/page'
import { useClient } from 'entities/user'
import { MAIN_CHARACTERISTICS, GoalCharacteristicName, GoalDto, MemberDto } from 'shared/api'
import { HashMark } from 'shared/config'
import Accordion from 'shared/ui/Accordion'
import { Calendar } from './calendar'
import { Date } from './date'
import { DayAgo } from './dayAgo'
import { Discussion } from './discussion'
import { Feedback } from './feedback'
import {
  getGoalInfo,
  getClientOwnership,
  checkOnOpenDiscussion,
  redefineTasks,
  findMember,
  useMessages,
  useSwitchDay,
} from './lib'
import { MenuActions } from './menuActions'
import { Task } from './task'
import { Views } from './views'
import { ViewTrigger } from './viewTrigger'

const Inheritance = dynamic(() => import('./inheritance'))
const Stages = dynamic(() => import('./stages'))
const Hashtags = dynamic(() => import('./hashtags'))
const Web = dynamic(() => import('./web'))
const ViewerControl = dynamic(() => import('./viewerControl'))
const OwnerControl = dynamic(() => import('./ownerControl'))

const CHARACTERISTICS: GoalCharacteristicName[] = [...MAIN_CHARACTERISTICS, 'members']

interface GoalCurrentProps {
  goal: GoalDto
  membership: MemberDto[]
  userId: number
  nickname: string
  clientPage: boolean
  clientMembership: MemberDto[]
}

function GoalCurrent({
  goal,
  membership,
  userId,
  nickname,
  clientPage,
  clientMembership,
}: GoalCurrentProps) {
  const { id, name, hashtags, characteristic, owner, stages, day, inherited, calendar, reactions } =
    goal
  const { query } = useRouter()
  const client = useClient()
  const messages = useMessages()
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
          <ViewTrigger ownerId={owner.id} dayId={day.id}>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="subtitle1" component="h2">
                  <b>{name}</b>
                </Typography>
                {inherited && <Inheritance owner={owner} />}
                <MenuActions
                  goalId={id}
                  goalName={name}
                  href={dayHref}
                  clientOwnership={clientOwnership}
                />
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
                      dayDate={day.date}
                      calendar={calendar}
                      isLoading={isLoading}
                      onChangeDate={onChangeDate}
                      shouldDisableDate={shouldDisableDate}
                    />
                  </Stack>
                  {!!stages.length && (
                    <Accordion
                      emoji="🚀"
                      header={messages.stagesHeader}
                      id={`stage-${day.id}`}
                      defaultExpanded
                      details={
                        <Stages
                          goalId={id}
                          stages={stages}
                          dayStage={day.stage}
                          forTomorrow={goalInfo.forTomorrow}
                          completeStage={goalInfo.completeStage}
                        />
                      }
                    />
                  )}
                  <Accordion
                    emoji="📌"
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
                    emoji="💭"
                    header={messages.feedbackHeader}
                    id={`${HashMark.Feedback}-${id}`}
                    defaultExpanded={!showDiscussion}
                    details={
                      <Feedback
                        goalId={id}
                        day={day}
                        forTomorrow={goalInfo.forTomorrow}
                        clientOwnership={clientOwnership}
                      />
                    }
                  />
                  <Accordion
                    emoji="💬"
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
                        dayId={day.id}
                        count={day.topicCount}
                        owner={owner}
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
                  <OwnerControl
                    goalId={id}
                    stages={stages}
                    dayDate={day.date}
                    dayStage={day.stage}
                  />
                ) : (
                  <ViewerControl
                    goalId={id}
                    day={day}
                    calendar={calendar}
                    reactions={reactions}
                    ownerName={owner.name}
                    forTomorrow={goalInfo.forTomorrow}
                    clientOwnership={clientOwnership}
                  />
                )}
              </>
            )}
            <Views views={day.views} />
          </Stack>
          {goalInfo.web && <Web />}
        </Stack>
      </Box>
    </Stack>
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
