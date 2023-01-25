import produce, { Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { MemberDto } from '@shared/api/member'
import { useMutateUserPage } from '@pages/user/hooks'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { useSnackbar } from '@entities/snackbar'
import { updateMember } from '@entities/member'
import { UserPageDto } from '@shared/api/user'
import { clickOnElem } from '@shared/lib/helpers/document'

const getNextState = (page: UserPageDto, member: MemberDto) =>
  produce(page, (draft: Draft<UserPageDto>) => {
    const draftMember = draft.clientMembership.find((m) => m.id === member.id)

    if (!draftMember) return

    draftMember.dayId = member.dayId
    draftMember.updated = member.updated
  })

export const useSendEndOfDay = () => {
  const { id } = useGoalContext()
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(updateMember, {
    onSuccess(member) {
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutatePage(getNextState(page, member))
      setTimeout(() => clickOnElem(`next-${id}`), 1)
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
