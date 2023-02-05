import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { differenceInCalendarDays } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSwitchDay } from 'features/day/switch-day'
import { CharacteristicGoal } from 'entities/characteristic'
import { checkOnOpenDiscussion } from 'entities/discussion'
import { findMember } from 'entities/member'
import { getDayHref } from 'entities/page'
import { useClient } from 'entities/user'
import { MAIN_CHARACTERISTICS, GoalCharacteristicName, GoalDto, MemberDto } from 'shared/api'
import { HashMark } from 'shared/config'
import { getMidnight } from 'shared/lib/utils'
import Accordion from 'shared/ui/Accordion'
import { Calendar } from './calendar'
import { SHOW_WEB_AFTER_DAYS } from './consts'
import { Day } from './day'
import { DayAgo } from './dayAgo'
import { Discussion } from './discussion'
import { Feedback } from './feedback'
import { useMessages } from './lib'
import { MenuActions } from './menuActions'
import { Task } from './task'
import { Views } from './views'
import { ViewTrigger } from './viewTrigger'

const Owner = dynamic(() => import('./owner'))
const Stages = dynamic(() => import('./stages'))
const Hashtags = dynamic(() => import('./hashtags'))
const Web = dynamic(() => import('./web'))
const ViewerControl = dynamic(() => import('./viewerControl'))
const OwnerControl = dynamic(() => import('./ownerControl'))

const CHARACTERISTICS: GoalCharacteristicName[] = [...MAIN_CHARACTERISTICS, 'members']

interface GoalCurrentProps {
  goal: GoalDto
  nickname: string
  clientPage: boolean
  clientMembership: MemberDto[]
}

function GoalCurrent({ goal, nickname, clientPage, clientMembership }: GoalCurrentProps) {
  const {
    id,
    name,
    hashtags,
    characteristic,
    owner,
    stages,
    day,
    member,
    calendar,
    reactions,
    completed,
    started,
  } = goal
  const { query } = useRouter()
  const client = useClient()
  const messages = useMessages()
  const today = getMidnight()
  const dayHref = getDayHref(nickname, id, day.id)
  const expandedDiscussion = checkOnOpenDiscussion(query, id)
  const { isLoading, prev, next, onChangeDate, shouldDisableDate } = useSwitchDay(goal)
  const clientGoal = owner.id === client?.id
  const clientMember = findMember(clientMembership, id, client?.id)
  const daysGoneForOwner = differenceInCalendarDays(new Date(), Date.parse(day.date))
  const runningDays = differenceInCalendarDays(Date.parse(day.date), Date.parse(started)) + 1
  const { canEdit, ownerControls, viewerControls, daysGone, forTomorrow, lastDay } = getGoalInfo()
  const restTasks = day.tasks.length - day.tasks.filter((t) => t.completed).length
  const completeStage = ownerControls && goal.stage <= goal.day.stage
  const renderWeb = lastDay && daysGone >= SHOW_WEB_AFTER_DAYS

  const onClickPrevDay = () => onChangeDate(prev)

  const onClickNextDay = () => onChangeDate(next)

  function getGoalInfo() {
    const defaultInfo = {
      canEdit: clientPage && clientGoal,
      viewerControls: true,
      ownerControls: false,
      daysGone: daysGoneForOwner,
      lastDay: calendar.at(-1)?.date === day.date,
      forTomorrow: daysGoneForOwner === -1,
    }

    if (clientGoal) {
      return {
        ...defaultInfo,
        viewerControls: false,
        ownerControls: clientPage && !completed,
      }
    }

    if (clientMember) {
      return {
        ...defaultInfo,
        canEdit: clientPage && clientMember.dayId === day.id,
        forTomorrow: !!differenceInCalendarDays(Date.parse(clientMember.updated), today),
      }
    }

    if (member) {
      return {
        ...defaultInfo,
        daysGone: differenceInCalendarDays(today, Date.parse(member.updated)),
        lastDay: member.dayId === day.id,
      }
    }

    return defaultInfo
  }

  return (
    <Stack
      id={`goal-${id}`}
      component="article"
      gap={2}
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
          gap={2}
          position="relative"
          height="100%"
          sx={({ spacing }) => ({
            padding: spacing(3, 2, 2),
            backgroundColor: 'underlay',
            borderRadius: '12px',
          })}
        >
          <ViewTrigger ownerId={owner.id} dayId={day.id}>
            <Stack gap={2}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="subtitle1" component="h2">
                  <b>{name}</b>
                </Typography>
                {member && <Owner owner={owner} />}
                <MenuActions
                  goalId={id}
                  goalName={name}
                  href={dayHref}
                  clientPage={clientPage}
                  clientGoal={clientGoal}
                  clientMember={clientMember}
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
                <CharacteristicGoal name="runningDays" value={runningDays} />
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
                    <Day date={prev} />
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
                          forTomorrow={forTomorrow}
                          completeStage={completeStage}
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
                        {day.tasks.map((task) => (
                          <Task
                            goalId={id}
                            task={task}
                            rest={restTasks}
                            forTomorrow={forTomorrow}
                            daysGoneForOwner={daysGoneForOwner}
                            canEdit={canEdit}
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
                    defaultExpanded={!expandedDiscussion}
                    details={
                      <Feedback
                        goalId={id}
                        day={day}
                        forTomorrow={forTomorrow}
                        clientGoal={clientGoal}
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
                    defaultExpanded={expandedDiscussion}
                    details={
                      <Discussion
                        dayId={day.id}
                        count={day.topicCount}
                        owner={owner}
                        clientGoal={clientGoal}
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
                    <Day date={next} />
                  </DayCardButton>
                )}
              </Stack>
            </Stack>
          </ViewTrigger>
          <Stack spacing={2}>
            {ownerControls && (
              <OwnerControl goalId={id} stages={stages} dayDate={day.date} dayStage={day.stage} />
            )}
            {viewerControls && (
              <ViewerControl
                goalId={id}
                day={day}
                calendar={calendar}
                reactions={reactions}
                ownerName={owner.name}
                forTomorrow={forTomorrow}
                clientPage={clientPage}
                clientMember={clientMember}
              />
            )}
            <Views views={day.views} />
          </Stack>
          {renderWeb && <Web />}
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