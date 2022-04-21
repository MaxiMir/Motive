import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto, MemberDto, UpdateMemberDto } from 'dto'
import { clickOnElem } from 'helpers/dom'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import { useMutateUserPage } from 'views/UserView/hook'
import MemberService from 'services/MemberService'
import { getNextState } from './helper'
import i18n from './i18n'

export const useSendEndOfDay = (goal: GoalDto): UseMutationResult<MemberDto, AxiosError, UpdateMemberDto> => {
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()
  const { message } = i18n[locale]

  return useMutation(MemberService.update, {
    onSuccess(member) {
      mutatePage(getNextState(page, member))
      setTimeout(() => clickOnElem(`next-${goal.id}`), 1)

      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
