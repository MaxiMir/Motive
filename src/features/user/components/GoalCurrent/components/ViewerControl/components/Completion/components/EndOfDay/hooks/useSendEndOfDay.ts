import produce, { Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { GoalDto, MemberDto, UserPageDto } from '@dto'
import MemberService from '@services/member'
import useMutateUserPage from '@features/user/hooks/useMutateUserPage'
import useSnackbar from '@hooks/useSnackbar'
import { clickOnElem } from '@helpers/document'

const getNextState = (page: UserPageDto, member: MemberDto): UserPageDto =>
  produce(page, (draft: Draft<UserPageDto>) => {
    const draftMember = draft.content.clientMembership.find((m) => m.id === member.id)

    if (!draftMember) return

    draftMember.dayId = member.dayId
    draftMember.updated = member.updated
  })

const useSendEndOfDay = (goal: GoalDto) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(MemberService.update, {
    onSuccess(member) {
      const message = formatMessage({ id: 'common.next-day-loading' })

      mutatePage(getNextState(page, member))
      setTimeout(() => clickOnElem(`next-${goal.id}`), 1)

      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}

export default useSendEndOfDay
