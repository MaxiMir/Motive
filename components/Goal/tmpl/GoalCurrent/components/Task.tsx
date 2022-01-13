import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { TaskDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppMarkdown from 'components/UI/AppMarkdown'

const TaskDate = dynamic(() => import('./TaskDate'))

interface TaskProps {
  task: TaskDto
}

export default function Task({ task }: TaskProps): JSX.Element {
  const classes = useStyles()
  const { name, date, completed } = task
  // todo check on completed
  return (
    <>
      <AppBox alignItems="center" spacing={1}>
        <AppEmoji name="energy" variant="h6" className={clsx([!completed && classes.notCompleted])} />
        <AppMarkdown text={name} />
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
