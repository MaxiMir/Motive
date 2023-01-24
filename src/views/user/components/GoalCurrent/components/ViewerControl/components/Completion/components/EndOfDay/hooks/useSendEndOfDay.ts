import produce, { Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useSnackbar } from '@modules/snackbar'
import { clickOnElem } from '@helpers/document'
import { useMutateUserPage } from '@views/user/hooks'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import { UserPageDto } from '@modules/page'
import { MemberDto, MemberService } from '@modules/member'

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

  return useMutation(MemberService.update, {
    onSuccess(member) {
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutatePage(getNextState(page, member))
      setTimeout(() => clickOnElem(`next-${id}`), 1)
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
