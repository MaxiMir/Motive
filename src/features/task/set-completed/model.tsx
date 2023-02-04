import produce from 'immer'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import dynamic from 'next/dynamic'
import { useUserPageCache, useClient } from 'entities/user'
import { UserPageDto, updateCompleted } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

const Button = dynamic(() => import('@mui/material/Button'))

const getNextState = (
  page: UserPageDto,
  goalId: number,
  taskId: number,
  completed: boolean,
): UserPageDto =>
  produce(page, (draft) => {
    const draftGoals = draft.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
    const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
    draftTask.completed = completed
  })

export const useSetCompleted = (goalId: number, id: number, rest: number) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const client = useClient()
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
    const newRest = rest - 1
    const undoText = formatMessage({ id: 'common.undo' })
    const messagePart = formatMessage({ id: !newRest ? 'common.well-done' : 'common.do-it' })
    const message = !newRest
      ? `${messagePart}, ${client?.name.split(' ')[0] || 'Master'}!`
      : `${messagePart}: ${newRest}`
    mutateCompleted(true)
    timerRef.current = setTimeout(() => mutate(id), 4000)
    enqueueSnackbar({
      message,
      severity: 'success',
      icon: !newRest ? '🦾️' : '⚡️',
      action: (
        <Button variant="text" sx={{ color: 'error.dark' }} onClick={onUndo}>
          {undoText}
        </Button>
      ),
    })
  }
}
