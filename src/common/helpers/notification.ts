import { ClientDto, NotificationDto, NotificationType } from '@dto'
import { getDiscussionHref, getFeedbackHref, getGoalHref, getGoalWithDayHref, getUserHref } from '@href'

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
      return getGoalWithDayHref(nickname, notification.details.id, notification.details.day)
  }
}
