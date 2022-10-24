import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalDto, MemberDto, UpdateMemberDto } from 'dto'
import { clickOnElem } from 'helpers/dom'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateUserPage } from 'pages/[id]/hook'
import MemberService from 'services/MemberService'
import { getNextState } from './helper'

export const useSendEndOfDay = (goal: GoalDto): UseMutationResult<MemberDto, AxiosError, UpdateMemberDto> => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()
  const message = formatMessage({ id: 'common.next-day-loading' })

  return useMutation(MemberService.update, {
    onSuccess(member) {
      mutatePage(getNextState(page, member))
      setTimeout(() => clickOnElem(`next-${goal.id}`), 1)

      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
