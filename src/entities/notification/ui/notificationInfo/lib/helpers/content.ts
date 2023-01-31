import { NotificationType } from 'shared/api'

interface NotificationInfo {
  emoji: string
  color: string
}

export const getNotificationInfo = (type: NotificationType): NotificationInfo => {
  switch (type) {
    case NotificationType.NewFollower:
      return { emoji: '⭐', color: 'warning.main' }
    case NotificationType.NewGoal:
      return { emoji: '💎', color: 'primary.main' }
    case NotificationType.AddMotivation:
      return { emoji: '💪', color: 'motivation.main' }
    case NotificationType.AddCreativity:
      return { emoji: '🧠', color: 'creativity.main' }
    case NotificationType.NewQuestion:
      return { emoji: '❓', color: 'error.main' }
    case NotificationType.NewSupport:
      return { emoji: '🙏', color: 'support.main' }
    case NotificationType.NewAnswer:
      return { emoji: '🙏', color: 'support.main' }
    case NotificationType.NewFeedback:
      return { emoji: '💭', color: '#cfd8dc' }
    case NotificationType.WebCoverage:
      return { emoji: '🕸', color: 'abandoned.main' }
    default:
      return { emoji: '🛎', color: 'common.white' }
  }
}
