import { Fragment, useRef } from 'react'
import dynamic from 'next/dynamic'
import { differenceInDays } from 'date-fns'
import { createStyles, useTheme, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Client, Goal, GoalCharacteristic, MainCharacteristic } from 'dto'
import { setQueryParams } from 'helpers/url'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import AppIconText from 'components/UI/AppIcon'
import AppDot from 'components/UI/AppDot'
import GoalCardDate from './components/GoalCardDate'
import GoalCardMenu from './components/GoalCardMenu'
import GoalCardDiscussion from './components/GoalCardDiscussion'
import GoalCardActions from './components/GoalCardActions'

const GoalCardOwner = dynamic(() => import('./components/GoalCardOwner'))
const GoalCardTask = dynamic(() => import('./components/GoalCardTask'))
const GoalCardHashtags = dynamic(() => import('./components/GoalCardHashtags'))
const GoalCardTaskForm = dynamic(() => import('./components/GoalCardTaskForm'))
const GoalCardFeedback = dynamic(() => import('./components/GoalCardFeedback'))
const GoalCardWeb = dynamic(() => import('./components/GoalCardWeb'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

const CHARACTERISTICS: GoalCharacteristic[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCardCurrentProps {
  type: 'current'
  goal: Goal
  client: Client
  onChangeGoal: (goal: Goal) => void
}

const SHOW_WEB_AFTER_DAYS = 14

export default function GoalCardCurrent({ goal, client, onChangeGoal }: GoalCardCurrentProps): JSX.Element {
  const currentDate = new Date()
  const { id, name, hashtags, href, started, characteristics, role, owner, day, dates } = goal
  const { id: dayId, date, tasks, feedback, messageCount, characteristics: dayCharacteristics } = day
  const classes = useStyles()
  const theme = useTheme()
  const colors = useCharacteristicColors()
  const restRef = useRef(tasks.length - tasks.filter((t) => t.completed).length)
  const days = differenceInDays(currentDate, Date.parse(started))
  const showWeb = differenceInDays(currentDate, Date.parse(date)) >= SHOW_WEB_AFTER_DAYS
  const hrefWithDate = setQueryParams(href, { date })
  const withForm = ['OWNER', 'MEMBER'].includes(role)
  const expandIcon = <AppIconText color="primary">expand_more</AppIconText>

  const onChangeDate = async (newDate: string) => {
    console.log(newDate)
  }

  const onSetAction = (characteristic: MainCharacteristic, increase: boolean) => {
    onChangeGoal({
      ...goal,
      characteristics: {
        ...goal.characteristics,
        [characteristic]: goal.characteristics[characteristic] + (increase ? 1 : -1),
      },
    })
  }

  return (
    <AppBox flexDirection="column" spacing={1} className={classes.root}>
      <GoalCardDate date={date} dates={dates} onChangeDate={onChangeDate} />
      <div className={classes.wrap} id={`goal-${id}`}>
        <AppBox flexDirection="column" justifyContent="space-between" spacing={3} className={classes.content}>
          <AppBox flexDirection="column" spacing={3}>
            <AppBox justifyContent="space-between" alignItems="center">
              <AppBox alignItems="center" spacing={1}>
                <AppHeader name="goal" variant="h6" component="h3">
                  {name}
                </AppHeader>
                {role === 'MEMBER' && <GoalCardOwner {...owner} />}
              </AppBox>
              <GoalCardMenu title={name} href={hrefWithDate} role={role} />
            </AppBox>
            <AppBox justifyContent="space-between" alignItems="center">
              {CHARACTERISTICS.map((characteristic) => (
                <Fragment key={characteristic}>
                  <CharacteristicCard
                    type="goal"
                    characteristic={characteristic}
                    value={characteristics[characteristic]}
                    color={colors[characteristic].fontColor}
                  />
                  <AppDot />
                </Fragment>
              ))}
              <CharacteristicCard
                type="goal"
                characteristic="runs for days"
                value={days}
                color={theme.palette.text.disabled}
              />
            </AppBox>
            {hashtags?.length && <GoalCardHashtags hashtags={hashtags} />}
            <div>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={expandIcon} aria-controls="feedback-content" id="feedback-header">
                  <AppHeader name="task" variant="h6" component="h2" color="primary">
                    Tasks
                  </AppHeader>
                </AccordionSummary>
                <AccordionDetails>
                  <AppBox flexDirection="column" spacing={2}>
                    {tasks.map((task, index) => (
                      <Fragment key={index}>
                        {!withForm ? (
                          <GoalCardTask {...task} />
                        ) : (
                          <GoalCardTaskForm
                            {...task}
                            rest={restRef.current}
                            onSet={(isCompleted) => {
                              restRef.current += isCompleted ? -1 : 1
                            }}
                          />
                        )}
                      </Fragment>
                    ))}
                  </AppBox>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={expandIcon} aria-controls="feedback-content" id="feedback-header">
                  <AppHeader name="feedback" variant="h6" component="h2" color="primary">
                    Feedback
                  </AppHeader>
                </AccordionSummary>
                <AccordionDetails>
                  <GoalCardFeedback {...feedback} />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={expandIcon} aria-controls="discussion-content" id="discussion-header">
                  <AppHeader name="comment" variant="h6" component="h2" color="primary">
                    Discussion {!messageCount ? '' : <span className={classes.messageCount}>{messageCount}</span>}
                  </AppHeader>
                </AccordionSummary>
                <AccordionDetails>
                  {!messageCount && role !== 'MEMBER' ? (
                    <AppTypography>Nothing so far...</AppTypography>
                  ) : (
                    <GoalCardDiscussion dayId={dayId} client={client} role={role} />
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </AppBox>
          <GoalCardActions
            role={role}
            dayId={dayId}
            characteristics={dayCharacteristics}
            client={client}
            onSetAction={onSetAction}
          />
        </AppBox>
        {showWeb && <GoalCardWeb />}
      </div>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: '0 0 100%',
      [theme.breakpoints.up('md')]: {
        flex: '1 1 calc(50% - 12px)',
        flexGrow: 0,
      },
    },
    wrap: {
      position: 'relative',
      height: '100%',
      padding: 2,
      background: `linear-gradient(to top left, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      borderRadius: 15,
    },
    content: {
      height: '100%',
      padding: 16,
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
    messageCount: {
      color: '#99989D',
    },
  }),
)
