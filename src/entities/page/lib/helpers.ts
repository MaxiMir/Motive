import { ClientDto, NotificationDto } from 'shared/api'
import { Route, HashMark, SearchParam } from 'shared/config'
import { joinToHref, setSearchParams } from 'shared/lib/helpers'

export function getGoalHref(nickname: string, goalId: number) {
  const hashMark = `#${HashMark.Goal}-${goalId}`

  return joinToHref(nickname, hashMark)
}

export function getDayHref(userHref: string, goalId: number, dayId: number) {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalHref(url, goalId)
}

export function getDiscussionHref(nickname: string, goalId: number, dayId: number) {
  const url = setSearchParams(nickname, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hash = `#${HashMark.Discussion}-${goalId}`

  return joinToHref(url, hash)
}

export function getFeedbackHref(nickname: string, goalId: number, dayId: number) {
  const url = setSearchParams(nickname, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hash = `#${HashMark.Feedback}-${goalId}`

  return joinToHref(url, hash)
}

export function getHashtagHref(q: string) {
  return setSearchParams(Route.Search, { q, type: 'tag' })
}

export function getNotificationHref(notification: NotificationDto, client?: ClientDto): string {
  const userPage = [
    'new-follower',
    'new-goal',
    'new-answer',
    'new-feedback',
    'web-coverage',
  ].includes(notification.type)
  const nickname = userPage ? notification.initiator.nickname : client?.nickname || ''

  switch (notification.type) {
    case 'new-follower':
      return joinToHref(nickname)
    case 'web-coverage':
      return getGoalHref(nickname, notification.details.id)
    case 'new-feedback':
      return getFeedbackHref(nickname, notification.details.id, notification.details.day)
    case 'new-question':
    case 'new-answer':
    case 'new-support':
      return getDiscussionHref(nickname, notification.details.id, notification.details.day)
    default:
      return getDayHref(nickname, notification.details.id, notification.details.day)
  }
}

export function getArticleHref(pathname: string): string {
  return `${Route.Blog}/${pathname}`
}
