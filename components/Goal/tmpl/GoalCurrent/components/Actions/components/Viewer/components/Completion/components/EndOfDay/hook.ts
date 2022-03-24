import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto, MemberDto, UpdateMemberDto } from 'dto'
import { clickOnElem } from 'helpers/dom'
import { toShortUserName } from 'helpers/prepare'
import useSnackbar from 'hooks/useSnackbar'
import useClient from 'hooks/useClient'
import { useMutateUserPage } from 'views/UserView/hook'
import MemberService from 'services/MemberService'
import { getNextState } from './helper'

export const useSendEndOfDay = (goal: GoalDto): UseMutationResult<MemberDto, AxiosError, UpdateMemberDto> => {
  const client = useClient()
  const [page, mutatePage] = useMutateUserPage()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(MemberService.update, {
    onSuccess(member) {
      mutatePage(getNextState(page, member))
      setTimeout(() => clickOnElem(`next-${goal.id}`), 1)

      enqueueSnackbar({
        message: `Excellent, ${toShortUserName(client?.name)}! Uploading your next tasks`,
        severity: 'success',
        icon: 'speaker',
      })
    },
  })
}
