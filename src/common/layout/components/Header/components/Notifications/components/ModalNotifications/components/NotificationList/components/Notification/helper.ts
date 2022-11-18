import produce from 'immer'
import { MainCharacteristicName, NotificationDto, NotificationType } from '@dto'
import { AppEmojiName } from '@ui/AppEmoji'

interface NotificationInfo {
  emoji: AppEmojiName
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

export const getNextState = (notifications: NotificationDto[], id: number): NotificationDto[] => {
  return produce(notifications, (draft) => {
    const draftNotification = draft.find((d) => d.id === id)

    if (!draftNotification) return

    draftNotification.read = true
  })
}
