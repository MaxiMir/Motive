import { produce, Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { MemberDto, UserPageDto, updateMember } from 'shared/api'
import { clickOnElem } from 'shared/lib/helpers'
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
    onSuccess(dto) {
      const message = formatMessage({ id: 'common.next-day-loading' })

      mutatePage(getNextState(page, dto, goalId))
      clickOnElem(`next-${goalId}`)
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })
}

function getNextState(page: UserPageDto, member: MemberDto, goalId: number) {
  return produce(page, (draft: Draft<UserPageDto>) => {
    const draftGoal = draft.goals.find((g) => g.id === goalId)

    if (!draftGoal?.member) return

    draftGoal.member.dayId = member.dayId
    draftGoal.member.updated = member.updated
  })
}
