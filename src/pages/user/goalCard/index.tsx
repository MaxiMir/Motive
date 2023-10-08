import { Box, Card, IconButton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { differenceInCalendarDays } from 'date-fns'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useSwitchDay } from 'features/day/switch-day'
import { useViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import { HashMark } from 'shared/config'
import Accordion from 'shared/ui/Accordion'
import Icon from 'shared/ui/Icon'
import { Calendar } from './calendar'
import { Cover } from './cover'
import { Discussion } from './discussion'
import { Feedback } from './feedback'
import { getInteraction } from './lib'
import { Members } from './members'
import { Points } from './points'
import { PointsRated } from './pointsRated'
import { SphereType } from './sphereType'
import { Task } from './task'
import { Views } from './views'
import { ViewTrigger } from './viewTrigger'

const Owner = dynamic(() => import('./owner'))
const Stages = dynamic(() => import('./stages'))
const Hashtag = dynamic(() => import('./hashtag'))
const ViewerActs = dynamic(() => import('./viewerActs'))
const OwnerActs = dynamic(() => import('./ownerActs'))

interface GoalCardProps {
  goal: GoalDto
  viewerPage: boolean
}

function GoalCard({ goal, viewerPage }: GoalCardProps) {
  const {
    id,
    name,
    sphere,
    hashtags,
    owner,
    stages,
    day,
    member,
    members,
    points,
    pointsTasks,
    lastMembers,
    calendar,
    started,
  } = goal
  const { formatMessage } = useIntl()
  const viewerPart = useViewerPart(goal, viewerPage)
  const { isLoading, prev, next, onChangeDate, shouldDisableDate } = useSwitchDay(goal)
  const runningDays = differenceInCalendarDays(Date.parse(day.date), Date.parse(started)) + 1
  const interaction = getInteraction(goal, viewerPart)
  const restTasks = day.tasks.length - day.tasks.filter((t) => t.completed).length
  const stagesHeader = formatMessage({ id: 'page.user.goal-current.stages-header' })
  const tasksHeader = formatMessage({ id: 'page.user.goal-current.tasks-header' })
  const feedbackHeader = formatMessage({ id: 'page.user.goal-current.feedback-header' })
  const nextDayText = formatMessage({ id: 'common.next-day' })
  const prevDayText = formatMessage({ id: 'common.prev-day' })

  const onClickPrevDay = () => onChangeDate(prev)

  const onClickNextDay = () => onChangeDate(next)

  return (
    <Article
      component="article"
      data-unit={`goal-${id}`}
      display="grid"
      gridTemplateRows="1fr auto"
    >
      <ViewTrigger ownerId={owner.id} dayId={day.id}>
        <Underlay
          justifyContent="space-between"
          position="relative"
          height="100%"
          borderRadius="12px"
        >
          <Cover goal={goal} viewerPart={viewerPart} />
          <Cont gap={2}>
            <Stack gap={1}>
              <Stack>
                <Typography variant="subtitle1" component="h2" fontWeight="bold">
                  {name}
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
              <Points points={points} pointsTasks={pointsTasks} />
              <Members members={members} lastMembers={lastMembers} />
            </Box>
            <StyledCard variant="outlined">
              <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <IconButton
                  disabled={isLoading || !prev}
                  aria-label={prevDayText}
                  onClick={onClickPrevDay}
                >
                  <Icon name="arrow_back" color="zen.silent" />
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
                  onClick={onClickNextDay}
                >
                  <Icon name="arrow_forward" color="zen.silent" />
                </IconButton>
              </Box>
              {!!stages.length && (
                <Accordion
                  iconStart={<Icon name="rocket_launch" color="primary.main" />}
                  summary={stagesHeader}
                  defaultExpanded
                  details={<Stages goal={goal} interaction={interaction} />}
                />
              )}
              <Accordion
                iconStart={<Icon name="assignment" color="error.light" />}
                summary={tasksHeader}
                defaultExpanded
                details={
                  <Stack spacing={1}>
                    {day.tasks.map((task) => (
                      <Task
                        goalId={id}
                        task={task}
                        rest={restTasks}
                        interaction={interaction}
                        key={task.id}
                      />
                    ))}
                  </Stack>
                }
              />
              <Accordion
                id={`${HashMark.Feedback}-${id}`}
                iconStart={<Icon name="quick_phrases" color="warning.light" />}
                summary={feedbackHeader}
                defaultExpanded
                details={
                  <Feedback
                    goalId={id}
                    day={day}
                    forFuture={interaction.forFuture}
                    viewerGoal={viewerPart.goal}
                  />
                }
              />
              <Discussion goalId={id} day={day} owner={owner} viewerGoal={viewerPart.goal} />
              <Stack spacing={2} px={2} my={2}>
                {interaction.viewerControls && (
                  <ViewerActs
                    goal={goal}
                    forFuture={interaction.forFuture}
                    viewerPart={viewerPart}
                  />
                )}
                {interaction.ownerControls && (
                  <OwnerActs goalId={id} stages={stages} dayStage={day.stage} calendar={calendar} />
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
                  <PointsRated day={day} />
                  <Views views={day.views} />
                </Box>
              </Stack>
            </StyledCard>
          </Cont>
        </Underlay>
      </ViewTrigger>
    </Article>
  )
}

const Article = styled(Box)({
  breakInside: 'avoid',
  '&:not(:last-child)': {
    marginBottom: 16,
  },
})

const Underlay = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: 12,
  backgroundColor: theme.palette.grey[900],
}))

const Cont = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const StyledCard = styled(Card)({
  width: '100%',
  background: 'none',
  borderRadius: '10px',
})

export default GoalCard
