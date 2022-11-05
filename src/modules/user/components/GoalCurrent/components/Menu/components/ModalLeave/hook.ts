import { useMutation, useQueryClient, UseMutationResult } from 'react-query'
import { AxiosError } from 'axios'
import { useIntl } from 'react-intl'
import { UserPageDto } from '@dto'
import { MemberService } from '@services/member'
import useClient from '@hooks/useClient'
import useSnackbar from '@hooks/useSnackbar'
import { useUserPageConfig } from '@modules/user/hook'
import { getNextState } from './helper'

export const useSendRemoveMember = (
  goalId: number,
  clientPage: boolean,
): UseMutationResult<void, AxiosError, number> => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const { key } = useUserPageConfig()
  const queryClient = useQueryClient()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(MemberService.delete, {
    onSuccess(_, id) {
      if (!client) return

      const message = formatMessage({ id: 'page.user.modal-goal.message' })

      queryClient.setQueriesData<UserPageDto | undefined>(
        key,
        (page) => page && getNextState(page, goalId, id, clientPage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
