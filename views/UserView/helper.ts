import produce from 'immer'
import { GoalDto, UserDetailDto, UserPageDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import i18n from './i18n'

export const getNextState = (page: UserPageDto, goals: GoalDto[]): UserPageDto =>
  produce(page, (draft) => {
    draft.content.goals = goals
  })

interface UserMeta {
  title?: string
  description?: string
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

  return {
    title: `${title}  ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `${description}${!goalsList ? '' : `: ${goalsList}`}`,
    url: `${process.env.HOST}/${user.nickname}`,
    image: user.avatar || undefined,
    type: 'profile',
  }
}

export const getUserHref = (nickname: string): string => `/${nickname}`
