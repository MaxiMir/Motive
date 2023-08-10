import { produce } from 'immer'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import dynamic from 'next/dynamic'
import { useUserPageCache } from 'entities/user'
import { useViewer } from 'entities/viewer'
import { UserPageDto, updateCompleted } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

const Button = dynamic(() => import('@mui/material/Button'))

export function useSetCompleted(goalId: number, id: number, rest: number) {
  const timerRef = useRef<NodeJS.Timeout>()
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [page, mutatePage] = useUserPageCache()
  const { mutate } = useMutation(updateCompleted, {
    onError() {
      mutateCompleted(false)
    },
  })

  const onUndo = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    mutateCompleted(false)
    closeSnackbar()
  }

  const mutateCompleted = (value: boolean) => {
    mutatePage(getNextState(page, goalId, id, value))
  }

  return () => {
    const nextRest = rest - 1
    const undoText = formatMessage({ id: 'common.undo' })
    const messagePart = formatMessage({ id: !nextRest ? 'common.well-done' : 'common.do-it' })
    const message = !nextRest
      ? `${messagePart}, ${viewer?.name.split(' ')[0] || 'Master'}!`
      : `${messagePart}: ${nextRest}`
    mutateCompleted(true)
    timerRef.current = setTimeout(() => mutate(id), 4000)
    enqueueSnackbar(message, {
      severity: 'success',
      icon: !nextRest ? '🦾️' : '🔥',
      action: (
        <Button variant="text" sx={{ color: 'error.dark' }} onClick={onUndo}>
          {undoText}
        </Button>
      ),
    })
  }
}

function getNextState(
  page: UserPageDto,
  goalId: number,
  taskId: number,
  completed: boolean,
): UserPageDto {
  return produce(page, (draft) => {
    const draftGoals = draft.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
    const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
    draftGoal.points += completed ? 1 : 0
    draftTask.completed = completed
  })
}
