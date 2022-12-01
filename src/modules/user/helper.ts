import { MemberDto } from '@dto'
import { getSearchParams, setSearchParams } from '@helpers/url'

export const getMember = (goalId: number, membership: MemberDto[], userId?: number): MemberDto | undefined => {
  return !userId ? undefined : membership.find((m) => m.userId === userId && m.goalId === goalId)
}

export const getServerSideUrl = (url: string): string => {
  const isClient = url?.includes('_next')

  if (!isClient) {
    return url
  }

  const { id, ...params } = getSearchParams(url)

  return setSearchParams(`/${id}`, params)
}
