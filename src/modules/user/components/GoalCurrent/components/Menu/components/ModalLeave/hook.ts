import { useMutation, useQueryClient, UseMutationResult } from 'react-query'
import { AxiosError } from 'axios'
import { useIntl } from 'react-intl'
import { UserPageDto } from 'src/common/dto'
import { MemberService } from 'src/common/services/member'
import useClient from 'src/common/hooks/useClient'
import useSnackbar from 'src/common/hooks/useSnackbar'
import { useUserPageConfig } from '@modules/user'
import { getNextState } from './helper'
import i18n from './i18n'

export const useSendRemoveMember = (
  goalId: number,
  clientPage: boolean,
): UseMutationResult<void, AxiosError, number> => {
  const { locale } = useIntl()
  const client = useClient()
  const { key } = useUserPageConfig()
  const queryClient = useQueryClient()
  const [enqueueSnackbar] = useSnackbar()
  const { message } = i18n[locale]

  return useMutation(MemberService.delete, {
    onSuccess(_, id) {
      if (!client) return

      queryClient.setQueriesData<UserPageDto | undefined>(
        key,
        (page) => page && getNextState(page, goalId, id, clientPage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
