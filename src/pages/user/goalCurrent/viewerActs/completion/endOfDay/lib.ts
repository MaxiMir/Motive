import { produce, Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { UserPageDto, updateMember } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

interface Options {
  id: number
  dayId: number
  updated: Date
}

export function useSendEndOfDay(goalId: number) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [page, mutatePage] = useUserPageCache()

  return useMutation(({ id, dayId, updated }: Options) => updateMember(id, { dayId, updated }), {
    onSuccess(res) {
      const message = formatMessage({ id: 'common.next-day-loading' })
      const nextState = produce(page, (draft: Draft<UserPageDto>) => {
        const draftGoal = draft.goals.find((g) => g.id === goalId)

        if (!draftGoal?.member) return

        draftGoal.member.dayId = res.dayId
        draftGoal.member.updated = res.updated
      })
      mutatePage(nextState)
      document.getElementById(`next-${goalId}`)?.click()
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })
}
