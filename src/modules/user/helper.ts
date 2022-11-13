import produce from 'immer'
import { GoalDto, MemberDto, UserPageDto } from '@dto'
import { getSearchParams, setQueryParams } from '@helpers/url'

export const getNextState = (page: UserPageDto, goals: GoalDto[]): UserPageDto =>
  produce(page, (draft) => {
    draft.content.goals = goals
  })

export const getMember = (goalId: number, membership: MemberDto[], userId?: number): MemberDto | undefined =>
  (userId && membership.find((m) => m.userId === userId && m.goalId === goalId)) || undefined

export const getServerSideUrl = (url: string): string => {
  const isClient = url?.includes('_next')

  if (!isClient) {
    return url
  }

  const { id, ...params } = getSearchParams(url)

  return setQueryParams(`/${id}`, params)
}
