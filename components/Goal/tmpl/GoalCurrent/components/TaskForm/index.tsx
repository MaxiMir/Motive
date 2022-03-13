import dynamic from 'next/dynamic'
import { MemberDto, TaskDto } from 'dto'
import { checkOnCompleted, checkOnFire } from 'components/Goal/tmpl/GoalCurrent/helper'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppBox from 'components/UI/AppBox'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppMarkdown from 'components/UI/AppMarkdown'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))
const CompletedByOther = dynamic(() => import('../CompletedByOther'))

interface TaskFormProps {
  goalId: number
  task: TaskDto
  member?: MemberDto
  rest: number
  daysGone: number
  forTomorrow: boolean
  clientPage: boolean
}

export default function TaskForm({
  goalId,
  task,
  member,
  rest,
  daysGone,
  forTomorrow,
  clientPage,
}: TaskFormProps): JSX.Element {
  const { id, name, date } = task
  const setCompleted = useSetCompleted(goalId, id, rest)
  const completed = checkOnCompleted(task, clientPage, member)
  const withFire = checkOnFire(task, daysGone)

  return (
    <form>
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <AppCheckbox
          name={id.toString()}
          label={
            <AppBox alignItems="center" spacing={1}>
              <AppMarkdown text={name} />
              {withFire && <CompletedByOther />}
            </AppBox>
          }
          checked={completed}
          disabled={completed || forTomorrow}
          onChange={setCompleted}
        />
      </TooltipTomorrow>
      {date && <TaskDate date={date} />}
    </form>
  )
}
