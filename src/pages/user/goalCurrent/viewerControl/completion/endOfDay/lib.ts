import { produce, Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { MemberDto, UserPageDto, updateMember } from 'shared/api'
import { clickOnElem } from 'shared/lib/helpers'
import { useSnackbar } from 'shared/ui/snackbar'

const getNextState = (page: UserPageDto, member: MemberDto) =>
  produce(page, (draft: Draft<UserPageDto>) => {
    const draftMember = draft.clientMembership.find((m) => m.id === member.id)

    if (!draftMember) return

    draftMember.dayId = member.dayId
    draftMember.updated = member.updated
  })

export const useSendEndOfDay = (goalId: number) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [page, mutatePage] = useUserPageCache()

  return useMutation(updateMember, {
    onSuccess(member) {
      const message = formatMessage({ id: 'common.next-day-loading' })

      mutatePage(getNextState(page, member))
      clickOnElem(`next-${goalId}`)
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })
}
