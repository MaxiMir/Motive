import dynamic from 'next/dynamic'
import { MemberDto, TaskDto } from 'dto'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppBox from 'components/UI/AppBox'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppMarkdown from 'components/UI/AppMarkdown'
import useSetCompleted from './hook'

const CompletedByOther = dynamic(() => import('../CompletedByOther'))

interface TaskFormProps {
  goalId: number
  task: TaskDto
  rest: number
  forTomorrow: boolean
  completedByOther: boolean
  clientMember?: MemberDto
}

export default function TaskForm({
  goalId,
  task,
  rest,
  forTomorrow,
  completedByOther,
  clientMember,
}: TaskFormProps): JSX.Element {
  const { id, name, completed } = task
  const setCompleted = useSetCompleted(goalId, id, rest, clientMember)

  return (
    <form>
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <AppCheckbox
          name={id.toString()}
          label={
            <AppBox alignItems="center" spacing={1}>
              <AppMarkdown text={name} />
              {completedByOther && <CompletedByOther />}
            </AppBox>
          }
          checked={completed}
          disabled={completed || forTomorrow}
          onChange={setCompleted}
        />
      </TooltipTomorrow>
    </form>
  )
}
