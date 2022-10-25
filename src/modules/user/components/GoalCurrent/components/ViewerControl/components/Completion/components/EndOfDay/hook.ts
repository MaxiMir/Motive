import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalDto, MemberDto, UpdateMemberDto } from 'src/common/dto'
import { clickOnElem } from 'src/common/helpers/dom'
import useSnackbar from 'src/common/hooks/useSnackbar'
import { useMutateUserPage } from '@modules/user'
import { MemberService } from 'src/common/services/member'
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
