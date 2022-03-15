import { MemberDto } from 'dto'
import { differenceInCalendarDays } from 'date-fns'

export const checkOnDisabled = (clientMember: MemberDto): boolean => {
  if (!clientMember?.lastEndOfDay) {
    return false
  }

  return !differenceInCalendarDays(Date.parse(clientMember.lastEndOfDay), new Date())
}
