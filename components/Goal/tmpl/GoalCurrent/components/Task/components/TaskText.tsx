import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { TaskDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppMarkdown from 'components/UI/AppMarkdown'

const TaskDate = dynamic(() => import('./TaskDate'))
const CompletedByOther = dynamic(() => import('components/Goal/tmpl/GoalCurrent/components/CompletedByOther'))

interface TaskTextProps {
  task: TaskDto
  completedByOther: boolean
}

export default function TaskText({ task, completedByOther }: TaskTextProps): JSX.Element {
  const classes = useStyles()
  const { name, date, completed } = task

  return (
    <>
      <AppBox alignItems="center" height={42} spacing={1}>
        <AppEmoji name="energy" variant="h6" className={clsx([!completed && classes.notCompleted])} />
        <AppMarkdown text={name} />
        {completedByOther && <CompletedByOther />}
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
