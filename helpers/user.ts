import { UserDetail } from 'dto'

export const getUserHref = (nickname: string): string => `/${nickname}`

interface UserMeta {
  title?: string
  description?: string
  url?: string
  type: string
}

export const getUserMeta = (user?: UserDetail): UserMeta => ({
  title: user && `${user.name} profile on ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: user && `See how ${user.name} (@${user.nickname}) accomplishes his goals`,
  url: user && `${process.env.HOST}/${user.nickname}`,
  type: 'profile',
})
