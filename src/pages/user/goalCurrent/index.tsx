import { Box, Card, IconButton, Stack, Typography } from '@mui/material'
import { differenceInCalendarDays } from 'date-fns'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useSwitchDay } from 'features/day/switch-day'
import { GoalScore } from 'entities/goal'
import { findMember } from 'entities/member'
import { getDayHref } from 'entities/page'
import { useClient } from 'entities/viewer'
import { GoalDto, MemberDto } from 'shared/api'
import { HashMark } from 'shared/config'
import { getMidnight } from 'shared/lib/utils'
import Accordion from 'shared/ui/Accordion'
import Icon from 'shared/ui/Icon'
import { Calendar } from './calendar'
import { SHOW_WEB_AFTER_DAYS } from './consts'
import { Discussion } from './discussion'
import { Feedback } from './feedback'
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
    owner,
    stages,
    day,
    points,
    clientPoints,
    member,
    members,
    calendar,
    completed,
    started,
  } = goal
  const client = useClient()
  const { formatMessage } = useIntl()
  const today = getMidnight()
  const dayHref = getDayHref(nickname, id, day.id)
  const { isLoading, prev, next, onChangeDate, shouldDisableDate } = useSwitchDay(goal)
  const clientGoal = owner.id === client?.id
  const clientMember = findMember(clientMembership, id, client?.id)
  const daysGoneForOwner = differenceInCalendarDays(new Date(), Date.parse(day.date))
  const runningDays = differenceInCalendarDays(Date.parse(day.date), Date.parse(started)) + 1
  const { canEdit, ownerControls, viewerControls, daysGone, forTomorrow, lastDay } = getGoalInfo()
  const restTasks = day.tasks.length - day.tasks.filter((t) => t.completed).length
  const completeStage = ownerControls && goal.stage <= goal.day.stage
  const renderWeb = lastDay && daysGone >= SHOW_WEB_AFTER_DAYS
  const stagesHeader = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const tasksHeader = formatMessage({ id: 'page.user.goal-current.tasks-header' })
  const feedbackHeader = formatMessage({ id: 'page.user.goal-current.feedback-header' })
  const nextDayText = formatMessage({ id: 'common.next-day' })
  const prevDayText = formatMessage({ id: 'common.prev-day' })

  const onClickPrevDay = () => onChangeDate(prev)

  const onClickNextDay = () => onChangeDate(next)

  function getGoalInfo() {
    const defaultInfo = {
      canEdit: clientPage && clientGoal,
      viewerControls: true,
      ownerControls: false,
      daysGone: daysGoneForOwner,
      lastDay: calendar?.at(-1)?.date === day.date,
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
        forTomorrow: differenceInCalendarDays(Date.parse(clientMember.updated), today) > 0,
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
    <Box
      id={`goal-${id}`}
      component="article"
      display="grid"
      gridTemplateRows="1fr auto"
      marginBottom="10px"
      sx={{ breakInside: 'avoid' }}
    >
      <Box
        padding="1px"
        height="100%"
        borderRadius="12px"
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
              <Stack gap={1}>
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
                {!!hashtags.length && <Hashtags hashtags={hashtags} />}
              </Stack>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <GoalScore name="points" value={points} />
                <GoalScore name="members" value={members} />
              </Box>
              <Stack alignItems="center">
                <Card
                  variant="outlined"
                  sx={{
                    width: '100%',
                    pb: 2,
                    borderRadius: '10px',
                    backgroundColor: '#121212',
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    <IconButton
                      disabled={isLoading || !prev}
                      aria-label={prevDayText}
                      sx={{ color: 'zen.silent' }}
                      onClick={onClickPrevDay}
                    >
                      <Icon name="arrow_back" />
                    </IconButton>
                    <Calendar
                      dayDate={day.date}
                      calendar={calendar}
                      runningDays={runningDays}
                      isLoading={isLoading}
                      onChangeDate={onChangeDate}
                      shouldDisableDate={shouldDisableDate}
                    />
                    <IconButton
                      id={`next-${id}`}
                      disabled={isLoading || !next}
                      aria-label={nextDayText}
                      sx={{ color: 'zen.silent' }}
                      onClick={onClickNextDay}
                    >
                      <Icon name="arrow_forward" />
                    </IconButton>
                  </Box>
                  {!!stages.length && (
                    <Accordion
                      emoji="🚀"
                      header={stagesHeader}
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
                    header={tasksHeader}
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
                    header={feedbackHeader}
                    id={`${HashMark.Feedback}-${id}`}
                    defaultExpanded
                    details={
                      <Feedback
                        goalId={id}
                        day={day}
                        forTomorrow={forTomorrow}
                        clientGoal={clientGoal}
                      />
                    }
                  />
                  <Discussion
                    goalId={id}
                    dayId={day.id}
                    count={day.topicCount}
                    owner={owner}
                    clientGoal={clientGoal}
                  />
                  <Stack spacing={2} px={2} mt={4}>
                    {viewerControls && (
                      <ViewerControl
                        goalId={id}
                        day={day}
                        calendar={calendar}
                        ownerName={owner.name}
                        clientPoints={clientPoints}
                        forTomorrow={forTomorrow}
                        clientPage={clientPage}
                        clientMember={clientMember}
                      />
                    )}
                    {ownerControls && (
                      <OwnerControl
                        goalId={id}
                        stages={stages}
                        dayDate={day.date}
                        dayStage={day.stage}
                      />
                    )}
                    <Views views={day.views} />
                  </Stack>
                </Card>
              </Stack>
            </Stack>
          </ViewTrigger>
          {renderWeb && <Web />}
        </Stack>
      </Box>
    </Box>
  )
}

export default GoalCurrent
