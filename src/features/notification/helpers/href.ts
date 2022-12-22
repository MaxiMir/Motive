import { ClientDto, getUserHref } from '@features/user'
import { NotificationDto, NotificationType } from '@features/notification/dto'
import { getDiscussionHref, getFeedbackHref, getGoalHref, getGoalDayHref } from '@href'

export const getNotificationHref = (notification: NotificationDto, client?: ClientDto): string => {
  const { user } = notification.details
  const userPage = [
    NotificationType.NewFollower,
    NotificationType.NewGoal,
    NotificationType.NewAnswer,
    NotificationType.NewFeedback,
    NotificationType.WebCoverage,
  ].includes(notification.type)
  const nickname = userPage ? user.nickname : client?.nickname || ''

  switch (notification.type) {
    case NotificationType.NewFollower:
      return getUserHref(nickname)
    case NotificationType.WebCoverage:
      return getGoalHref(nickname, notification.details.id)
    case NotificationType.NewFeedback:
      return getFeedbackHref(nickname, notification.details.id, notification.details.day)
    case NotificationType.NewQuestion:
    case NotificationType.NewAnswer:
    case NotificationType.NewSupport:
      return getDiscussionHref(nickname, notification.details.id, notification.details.day)
    default:
      return getGoalDayHref(nickname, notification.details.id, notification.details.day)
  }
}