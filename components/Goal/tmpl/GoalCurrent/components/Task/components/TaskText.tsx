import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { TaskDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppMarkdown from 'components/UI/AppMarkdown'

const CompletedByOther = dynamic(() => import('./CompletedByOther'))

interface TaskTextProps {
  task: TaskDto
  completedByOther: boolean
}

export default function TaskText({ task, completedByOther }: TaskTextProps): JSX.Element {
  const classes = useStyles()
  const { name, completed } = task

  return (
    <>
      <AppEmoji name="energy" variant="h6" className={clsx([!completed && classes.notCompleted])} />
      <AppMarkdown text={name} />
      {completedByOther && <CompletedByOther />}
    </>
  )
}

const useStyles = makeStyles({
  notCompleted: {
    filter: 'grayscale(1)',
  },
})
