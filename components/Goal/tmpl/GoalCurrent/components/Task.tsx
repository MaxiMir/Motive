import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { MemberDto, TaskDto } from 'dto'
import { checkOnCompleted, checkOnFire } from 'components/Goal/tmpl/GoalCurrent/helper'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppMarkdown from 'components/UI/AppMarkdown'

const TaskDate = dynamic(() => import('./TaskDate'))
const CompletedByOther = dynamic(() => import('./CompletedByOther'))

interface TaskProps {
  task: TaskDto
  member?: MemberDto
  daysGone: number
  clientPage: boolean
}

export default function Task({ task, member, daysGone, clientPage }: TaskProps): JSX.Element {
  const classes = useStyles()
  const { name, date } = task
  const completed = checkOnCompleted(task, clientPage, member)
  const withFire = checkOnFire(task, daysGone)

  return (
    <>
      <AppBox alignItems="center" spacing={1}>
        <AppEmoji name="energy" variant="h6" className={clsx([!completed && classes.notCompleted])} />
        <AppMarkdown text={name} />
        {withFire && <CompletedByOther />}
      </AppBox>
      {date && <TaskDate date={date} />}
    </>
  )
}

const useStyles = makeStyles({
  notCompleted: {
    filter: 'grayscale(1)',
  },
})
