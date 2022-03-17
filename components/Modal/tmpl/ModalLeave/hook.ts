import produce, { Draft } from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationResult } from 'react-query/types/react/types'
import { AxiosError } from 'axios'
import { UserPageDto } from 'dto'
import MemberService from 'services/MemberService'
import useClient from 'hooks/useClient'
import useSnackbar from 'hooks/useSnackbar'
import { useUserPageConfig } from 'views/UserView/hook'

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

      queryClient.setQueriesData(key, (page) => {
        if (!page) return page

        return produce(page, (draft: Draft<UserPageDto>) => {
          draft.content.clientMembership = draft.content.clientMembership.filter((o) => o.id !== id)

          if (clientPage) {
            draft.content.goals = draft.content.goals.filter((g) => g.id !== goalId)
            return
          }

          const draftGoals = draft.content.goals
          const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
          draftGoal.characteristic.members -= 1
        })
      })
      enqueueSnackbar({ message: 'Successfully left', severity: 'success', icon: 'speaker' })
    },
  })
}
