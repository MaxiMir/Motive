import { toHref, getDiscussionHref, getFeedbackHref, getGoalHref, getDayHref } from 'entities/user'
import { NotificationDto, NotificationType, ClientDto } from 'shared/api'

type GetNotificationHref = (notification: NotificationDto, client?: ClientDto) => string

export const getNotificationHref: GetNotificationHref = (notification, client) => {
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
      return toHref(nickname)
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
