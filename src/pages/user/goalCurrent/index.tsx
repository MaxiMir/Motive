import { Box, Card, IconButton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { differenceInCalendarDays } from 'date-fns'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useSwitchDay } from 'features/day/switch-day'
import { useViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import { HashMark } from 'shared/config'
import { getMidnight } from 'shared/lib/utils'
import Accordion from 'shared/ui/Accordion'
import Icon from 'shared/ui/Icon'
import { Calendar } from './calendar'
import { SHOW_WEB_AFTER_DAYS } from './consts'
import { Cover } from './cover'
import { Discussion } from './discussion'
import { Feedback } from './feedback'
import { Members } from './members'
import { Points } from './points'
import { ShareDay } from './shareDay'
import { SphereType } from './sphereType'
import { Task } from './task'
import { Views } from './views'
import { ViewTrigger } from './viewTrigger'

const Owner = dynamic(() => import('./owner'))
const CoverMenu = dynamic(() => import('./coverMenu'))
const Membership = dynamic(() => import('./membership'))
const Stages = dynamic(() => import('./stages'))
const Hashtag = dynamic(() => import('./hashtag'))
const ViewerActs = dynamic(() => import('./viewerActs'))
const OwnerActs = dynamic(() => import('./ownerActs'))

interface GoalCurrentProps {
  goal: GoalDto
  viewerPage: boolean
}

function GoalCurrent({ goal, viewerPage }: GoalCurrentProps) {
  const {
    id,
    name,
    cover,
    sphere,
    hashtags,
    owner,
    stages,
    day,
    points,
    member,
    members,
    lastMembers,
    calendar,
    completed,
    started,
  } = goal
  const { formatMessage } = useIntl()
  const viewerPart = useViewerPart(goal, viewerPage)
  const { isLoading, prev, next, onChangeDate, shouldDisableDate } = useSwitchDay(goal)
  const daysGoneForOwner = differenceInCalendarDays(new Date(), Date.parse(day.date))
  const runningDays = differenceInCalendarDays(Date.parse(day.date), Date.parse(started)) + 1
  const { canEdit, ownerControls, viewerControls, daysGone, forTomorrow, lastDay } = getGoalInfo()
  const restTasks = day.tasks.length - day.tasks.filter((t) => t.completed).length
  const completeStage = ownerControls && goal.stage <= goal.day.stage
  const web = lastDay && daysGone >= SHOW_WEB_AFTER_DAYS
  const stagesHeader = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const tasksHeader = formatMessage({ id: 'page.user.goal-current.tasks-header' })
  const feedbackHeader = formatMessage({ id: 'page.user.goal-current.feedback-header' })
  const nextDayText = formatMessage({ id: 'common.next-day' })
  const prevDayText = formatMessage({ id: 'common.prev-day' })

  const onClickPrevDay = () => onChangeDate(prev)

  const onClickNextDay = () => onChangeDate(next)

  function getGoalInfo() {
    const today = getMidnight()

    return {
      canEdit: !viewerPart.member
        ? viewerPart.page && viewerPart.goal
        : viewerPart.page && viewerPart.member.dayId === day.id,
      forTomorrow: !viewerPart.member
        ? daysGoneForOwner === -1
        : differenceInCalendarDays(Date.parse(viewerPart.member.updated), today) > 0,
      viewerControls: !viewerPart.goal,
      ownerControls: !viewerPart.goal ? false : viewerPart.page && !completed,
      daysGone: !member
        ? daysGoneForOwner
        : differenceInCalendarDays(today, Date.parse(member.updated)),
      lastDay: !member ? calendar?.at(-1)?.date === day.date : member.dayId === day.id,
    }
  }

  return (
    <ViewTrigger ownerId={owner.id} dayId={day.id}>
      <Box
        id={`goal-${id}`}
        component="article"
        display="grid"
        gridTemplateRows="1fr auto"
        marginBottom="10px"
        sx={{ breakInside: 'avoid' }}
      >
        <Gradient padding="1px" height="100%" borderRadius="12px">
          <Underlay justifyContent="space-between" position="relative" height="100%">
            <Cover
              cover={cover}
              sphere={sphere}
              web={web}
              bottom={[
                !viewerPart.goal ? null : <CoverMenu goalId={id} cover={cover} key="menu" />,
                <ShareDay goalId={id} dayId={day.id} title={name} key="share" />,
                viewerPart.goal ? null : (
                  <Membership goal={goal} viewerPart={viewerPart} key="member" />
                ),
              ]}
            />
            <Cont gap={2}>
              <Stack gap={1}>
                <Stack>
                  <Typography variant="subtitle1" component="h2">
                    <b>{name}</b>
                  </Typography>
                  {member && <Owner owner={owner} started={member.started} />}
                  <SphereType sphere={sphere} />
                </Stack>
                {!!hashtags.length && (
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {hashtags.map((hashtag) => (
                      <Hashtag hashtag={hashtag} key={hashtag} />
                    ))}
                  </Box>
                )}
              </Stack>
              <Box display="flex" justifyContent="space-between">
                <Points points={points} />
                <Members members={members} lastMembers={lastMembers} />
              </Box>
              <Stack alignItems="center">
                <StyledCard variant="outlined">
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
                      id={`stage-${day.id}`}
                      header={stagesHeader}
                      icon={<Icon name="rocket_launch" color="primary.main" />}
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
                    id={`tasksContent-${day.id}`}
                    header={tasksHeader}
                    icon={<Icon name="keep_public" color="error.light" />}
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
                    id={`${HashMark.Feedback}-${id}`}
                    header={feedbackHeader}
                    icon={<Icon name="quick_phrases" color="warning.light" />}
                    defaultExpanded
                    details={
                      <Feedback
                        goalId={id}
                        day={day}
                        forTomorrow={forTomorrow}
                        viewerGoal={viewerPart.goal}
                      />
                    }
                  />
                  <Discussion
                    goalId={id}
                    dayId={day.id}
                    count={day.topicCount}
                    owner={owner}
                    viewerGoal={viewerPart.goal}
                  />
                  <Stack spacing={2} px={2} my={2}>
                    {viewerControls && (
                      <ViewerActs goal={goal} forTomorrow={forTomorrow} viewerPart={viewerPart} />
                    )}
                    {ownerControls && (
                      <OwnerActs
                        goalId={id}
                        stages={stages}
                        dayDate={day.date}
                        dayStage={day.stage}
                      />
                    )}
                    <Views views={day.views} />
                  </Stack>
                </StyledCard>
              </Stack>
            </Cont>
          </Underlay>
        </Gradient>
      </Box>
    </ViewTrigger>
  )
}

const Gradient = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to top left, ${theme.palette.motivation.main}, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
}))

const Underlay = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.underlay,
  borderRadius: '12px',
  overflow: 'hidden',
}))

const Cont = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const StyledCard = styled(Card)({
  width: '100%',
  pb: 2,
  borderRadius: '10px',
  backgroundColor: '#121212',
})

export default GoalCurrent
