import { UserDetailDto } from 'dto'

interface UserMeta {
  title?: string
  description?: string
  url?: string
  type: string
}

export const getUserMeta = (user?: UserDetailDto): UserMeta => ({
  title: user && `${user.name} • profile on ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: user && `See how ${user.name} (@${user.nickname}) accomplishes his goals`,
  url: user && `${process.env.HOST}/${user.nickname}`,
  type: 'profile',
})

export const getUserHref = (nickname: string): string => `/${nickname}`
