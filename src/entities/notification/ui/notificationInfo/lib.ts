import { NotificationType } from 'shared/api'

export const getNotificationEmoji = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.NewFollower:
      return '⭐'
    case NotificationType.NewGoal:
      return '💎'
    case NotificationType.AddMotivation:
      return '💪'
    case NotificationType.AddCreativity:
      return '🧠'
    case NotificationType.NewQuestion:
      return '❓'
    case NotificationType.NewSupport:
      return '🙏'
    case NotificationType.NewAnswer:
      return '📮'
    case NotificationType.NewFeedback:
      return '💭'
    case NotificationType.WebCoverage:
      return '🕸'
    default:
      return '🛎'
  }
}
