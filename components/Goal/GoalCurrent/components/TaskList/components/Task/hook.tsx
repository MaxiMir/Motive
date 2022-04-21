import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { MemberDto } from 'dto'
import TaskService from 'services/TaskService'
import { toShortUserName } from 'helpers/prepare'
import useSnackbar from 'hooks/useSnackbar'
import useClient from 'hooks/useClient'
import useLocale from 'hooks/useLocale'
import { useMutateUserPage } from 'views/UserView/hook'
import { getGoalNextState } from './helper'
import i18n from './i18n'

const Button = dynamic(() => import('@mui/material/Button'))

export default function useSetCompleted(
  goalId: number,
  id: number,
  rest: number,
  clientMember?: MemberDto,
): () => void {
  const timerRef = useRef<NodeJS.Timeout>()
  const { locale } = useLocale()
  const client = useClient()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()
  const { mutate } = useMutation(TaskService.updateCompleted, {
    onError() {
      mutateCompleted(false)
    },
  })

  const onUndo = () => {
    timerRef.current && clearTimeout(timerRef.current)
    mutateCompleted(false)
    closeSnackbar()
  }

  const mutateCompleted = (value: boolean) => {
    mutatePage(getGoalNextState(page, goalId, id, value, clientMember))
  }

  return () => {
    const newRest = rest - 1
    const { getMessage, undo } = i18n[locale]
    const message = getMessage(toShortUserName(client?.name), newRest)

    mutateCompleted(true)
    timerRef.current = setTimeout(() => mutate(id), 4000)

    enqueueSnackbar({
      message,
      severity: 'success',
      icon: !newRest ? 'motivation-tech' : 'energy',
      action: (
        <Button variant="outlined" onClick={onUndo}>
          {undo}
        </Button>
      ),
    })
  }
}
