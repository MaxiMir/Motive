import { useRef } from 'react'
import dynamic from 'next/dynamic'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import useClient from '@lib/hooks/useClient'
import { MemberDto } from '@app/model/member'
import { useMutateUserPage } from '@pages/user/hooks'
import { useSnackbar } from '@entities/snackbar'
import { UserPageDto } from '@entities/user'
import { updateCompleted } from '@entities/task'

const Button = dynamic(() => import('@mui/material/Button'))

const truncateUserName = (name?: string) => (!name ? 'Master' : name.split(' ')[0])

const getGoalNextState = (
  page: UserPageDto,
  goalId: number,
  taskId: number,
  completed: boolean,
  clientMember?: MemberDto,
): UserPageDto =>
  produce(page, (draft) => {
    if (!clientMember) {
      const draftGoals = draft.goals
      const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
      const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
      draftTask.completed = completed
      return
    }

    const draftMember = draft.membership.find((m) => m.id === clientMember.id)

    if (!draftMember) return

    draftMember.completedTasks = completed
      ? [...draftMember.completedTasks, taskId]
      : draftMember.completedTasks.filter((id) => id === taskId)
  })

export const useSetCompleted = (
  goalId: number,
  id: number,
  rest: number,
  clientMember?: MemberDto,
) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const { formatMessage } = useIntl()
  const client = useClient()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()
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
    mutatePage(getGoalNextState(page, goalId, id, value, clientMember))
  }

  return () => {
    const newRest = rest - 1
    const undoText = formatMessage({ id: 'common.undo' })
    const messagePart = formatMessage({ id: !newRest ? 'common.well-done' : 'common.do-it' })
    const message = !newRest
      ? `${messagePart}, ${truncateUserName(client?.name)}!`
      : `${messagePart}: ${newRest}`
    mutateCompleted(true)
    timerRef.current = setTimeout(() => mutate(id), 4000)
    enqueueSnackbar({
      message,
      severity: 'success',
      icon: !newRest ? 'motivation-tech' : 'energy',
      action: (
        <Button variant="text" sx={{ color: 'error.dark' }} onClick={onUndo}>
          {undoText}
        </Button>
      ),
    })
  }
}
