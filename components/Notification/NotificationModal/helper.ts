import produce from 'immer'
import { ClientDto, MainCharacteristic, NotificationDto, NotificationType } from 'dto'
import { getDiscussionUrn, getFeedbackUrn, getGoalUrn, getGoalWithDayUrn, getUserUrn } from 'helpers/url'
import { toShortString } from 'helpers/prepare'
import { AppEmojiName } from 'components/ui/AppEmoji'

type NotificationInfo = { emoji: AppEmojiName; color: string }

export const getNotificationInfo = (type: NotificationType): NotificationInfo => {
  switch (type) {
    case NotificationType.NewFollower:
      return { emoji: 'following', color: 'warning.main' }
    case NotificationType.NewGoal:
      return { emoji: 'goal', color: 'primary.main' }
    case NotificationType.AddMotivation:
      return { emoji: MainCharacteristic.Motivation, color: 'motivation.main' }
    case NotificationType.AddCreativity:
      return { emoji: MainCharacteristic.Creativity, color: 'creativity.main' }
    case NotificationType.NewQuestion:
      return { emoji: 'question', color: 'error.main' }
    case NotificationType.NewSupport:
      return { emoji: MainCharacteristic.Support, color: 'support.main' }
    case NotificationType.NewAnswer:
      return { emoji: MainCharacteristic.Support, color: 'support.main' }
    case NotificationType.NewFeedback:
      return { emoji: 'feedback', color: '#cfd8dc' }
    case NotificationType.WebCoverage:
      return { emoji: 'web', color: 'abandoned.main' }
    default:
      return { emoji: 'notification', color: 'common.white' }
  }
}

export const getNotificationUrn = (notification: NotificationDto, client?: ClientDto): string => {
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
      return getUserUrn(nickname)
    case NotificationType.WebCoverage:
      return getGoalUrn(nickname, notification.details.id)
    case NotificationType.NewFeedback:
      return getFeedbackUrn(nickname, notification.details.id, notification.details.day)
    case NotificationType.NewQuestion:
    case NotificationType.NewAnswer:
    case NotificationType.NewSupport:
      return getDiscussionUrn(nickname, notification.details.id, notification.details.day)
    default:
      return getGoalWithDayUrn(nickname, notification.details.id, notification.details.day)
  }
}

export const getDetailsName = (name?: string): string => (!name ? '' : toShortString(name, 40))

export const getNextState = (notifications: NotificationDto[], id: number): NotificationDto[] => {
  return produce(notifications, (draft) => {
    const draftNotification = draft.find((d) => d.id === id)

    if (!draftNotification) return

    draftNotification.read = true
  })
}
