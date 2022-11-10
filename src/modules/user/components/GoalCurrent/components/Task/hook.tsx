import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { MemberDto } from '@dto'
import { TaskService } from '@services/task'
import { toShortUserName } from '@helpers/prepare'
import useSnackbar from '@hooks/useSnackbar'
import useClient from '@hooks/useClient'
import { useMutateUserPage } from '@modules/user/hook'
import { getGoalNextState } from './helper'

const Button = dynamic(() => import('@mui/material/Button'))

export default function useSetCompleted(
  goalId: number,
  id: number,
  rest: number,
  clientMember?: MemberDto,
): () => void {
  const timerRef = useRef<NodeJS.Timeout>()
  const { formatMessage } = useIntl()
  const client = useClient()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()
  const { mutate } = useMutation(TaskService.updateCompleted, {
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
    const message = !newRest ? `${messagePart}, ${toShortUserName(client?.name)}!` : `${messagePart}: ${newRest}`

    mutateCompleted(true)
    timerRef.current = setTimeout(() => mutate(id), 4000)

    enqueueSnackbar({
      message,
      severity: 'success',
      icon: !newRest ? 'motivation-tech' : 'energy',
      action: (
        <Button variant="outlined" onClick={onUndo}>
          {undoText}
        </Button>
      ),
    })
  }
}