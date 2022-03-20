import { useMutation, useQueryClient } from 'react-query'
import { UseMutationResult } from 'react-query/types/react/types'
import { AxiosError } from 'axios'
import { UserPageDto } from 'dto'
import MemberService from 'services/MemberService'
import useClient from 'hooks/useClient'
import useSnackbar from 'hooks/useSnackbar'
import { useUserPageConfig } from 'views/UserView/hook'
import { getNextState } from './helper'

export const useSendRemoveMember = (
  goalId: number,
  clientPage: boolean,
): UseMutationResult<void, AxiosError, number> => {
  const client = useClient()
  const { key } = useUserPageConfig()
  const queryClient = useQueryClient()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(MemberService.delete, {
    onSuccess(_, id) {
      if (!client) return

      queryClient.setQueriesData<UserPageDto | undefined>(
        key,
        (page) => page && getNextState(page, goalId, id, clientPage),
      )
      enqueueSnackbar({ message: 'Successfully left', severity: 'success', icon: 'speaker' })
    },
  })
}
