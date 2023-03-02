import { ClientDto, NotificationDto, NotificationType } from 'shared/api'
import { Route, HashMark, SearchParam } from 'shared/config'
import { joinToHref, setSearchParams } from 'shared/lib/helpers'

export const getGoalHref = (nickname: string, goalId: number) => {
  const hashMark = `#${HashMark.Goal}-${goalId}`

  return joinToHref(nickname, hashMark)
}

export const getDayHref = (userHref: string, goalId: number, dayId: number) => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalHref(url, goalId)
}

export const getDiscussionHref = (nickname: string, goalId: number, dayId: number) => {
  const url = setSearchParams(nickname, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hash = `#${HashMark.Discussion}-${goalId}`

  return joinToHref(url, hash)
}

export const getFeedbackHref = (nickname: string, goalId: number, dayId: number) => {
  const url = setSearchParams(nickname, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hash = `#${HashMark.Feedback}-${goalId}`

  return joinToHref(url, hash)
}

export const getHashtagHref = (q: string) => {
  return setSearchParams(Route.Search, { q, type: 'tag' })
}

export const getNotificationHref = (notification: NotificationDto, client?: ClientDto): string => {
  const userPage = [
    NotificationType.NewFollower,
    NotificationType.NewGoal,
    NotificationType.NewAnswer,
    NotificationType.NewFeedback,
    NotificationType.WebCoverage,
  ].includes(notification.type)
  const nickname = userPage ? notification.initiator.nickname : client?.nickname || ''

  switch (notification.type) {
    case NotificationType.NewFollower:
      return joinToHref(nickname)
    case NotificationType.WebCoverage:
      return getGoalHref(nickname, notification.details.id)
    case NotificationType.NewFeedback:
      return getFeedbackHref(nickname, notification.details.id, notification.details.day)
    case NotificationType.NewQuestion:
    case NotificationType.NewAnswer:
    case NotificationType.NewSupport:
      return getDiscussionHref(nickname, notification.details.id, notification.details.day)
    default:
      return getDayHref(nickname, notification.details.id, notification.details.day)
  }
}

export const getArticleHref = (id: string): string => `${Route.Articles}/${id}`
