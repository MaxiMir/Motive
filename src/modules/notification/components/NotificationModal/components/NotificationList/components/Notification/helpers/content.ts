import { NotificationType } from '@modules/notification/dto'
import { MainCharacteristicName } from '@modules/characteristic'
import { EmojiName } from '@ui/Emoji'

interface NotificationInfo {
  emoji: EmojiName
  color: string
}

export const getNotificationInfo = (type: NotificationType): NotificationInfo => {
  switch (type) {
    case NotificationType.NewFollower:
      return { emoji: 'following', color: 'warning.main' }
    case NotificationType.NewGoal:
      return { emoji: 'goal', color: 'primary.main' }
    case NotificationType.AddMotivation:
      return { emoji: MainCharacteristicName.Motivation, color: 'motivation.main' }
    case NotificationType.AddCreativity:
      return { emoji: MainCharacteristicName.Creativity, color: 'creativity.main' }
    case NotificationType.NewQuestion:
      return { emoji: 'question', color: 'error.main' }
    case NotificationType.NewSupport:
      return { emoji: MainCharacteristicName.Support, color: 'support.main' }
    case NotificationType.NewAnswer:
      return { emoji: MainCharacteristicName.Support, color: 'support.main' }
    case NotificationType.NewFeedback:
      return { emoji: 'feedback', color: '#cfd8dc' }
    case NotificationType.WebCoverage:
      return { emoji: 'web', color: 'abandoned.main' }
    default:
      return { emoji: 'notification', color: 'common.white' }
  }
}
