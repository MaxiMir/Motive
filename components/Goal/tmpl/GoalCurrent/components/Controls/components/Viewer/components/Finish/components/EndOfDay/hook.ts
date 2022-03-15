import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto, MemberDto, UpdateMemberDto } from 'dto'
import { getToday } from 'helpers/date'
import MemberService from 'services/MemberService'

type UseSendEndOfDay = UseMutationResult<void, AxiosError, UpdateMemberDto>

export const useSendEndOfDay = (goal: GoalDto, clientMember: MemberDto): UseSendEndOfDay => {
  return useMutation(() => MemberService.update(clientMember.id, { dayId: '1', date: getToday() }))
}
