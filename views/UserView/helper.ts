import produce from 'immer'
import { GoalDto, MemberDto, UserDetailDto, UserPageDto } from 'dto'
import { getImageUrl, getSearchParams, setQueryParams } from 'helpers/url'
import { Locale } from 'hooks/useLocale'
import i18n from './i18n'

export const getServerSideUrl = (url: string): string => {
  const isClient = url?.includes('_next')

  if (!isClient) {
    return url
  }

  const { id, ...params } = getSearchParams(url)

  return setQueryParams(`/${id}`, params)
}

export const getNextState = (page: UserPageDto, goals: GoalDto[]): UserPageDto =>
  produce(page, (draft) => {
    draft.content.goals = goals
  })

interface UserMeta {
  title?: string
  description?: string
  keywords?: string
  url?: string
  type: string
  image?: string
}

export const getUserMeta = (user: UserDetailDto | undefined, locale: Locale): UserMeta | null => {
  if (!user) {
    return null
  }

  const { getTitle, getDescription } = i18n[locale]
  const goalsList = user.goals.map((g) => g.name).join(', ')
  const title = getTitle(user)
  const description = getDescription(user)
  const image = !user.avatar ? undefined : (getImageUrl(user.avatar) as string)

  return {
    title: `${title}  ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `${description}${!goalsList ? '' : `: ${goalsList}`}`,
    keywords: user.confirmations.map((c) => c.goal.name).join(', '),
    image,
    type: 'profile',
  }
}

export const getMember = (goalId: number, membership: MemberDto[], userId?: number): MemberDto | undefined =>
  (userId && membership.find((m) => m.userId === userId && m.goalId === goalId)) || undefined
