import { NOTIFICATION_TYPE, NotificationDto } from 'dto'
import { getGoalUrn, getUserUrn } from 'helpers/url'
import { AppEmojiName } from 'components/UI/AppEmoji'
import produce from 'immer'

type NotificationInfo = {
  emoji: AppEmojiName
  color: string
  href: string
}

export const getNotificationInfo = (notification: NotificationDto): NotificationInfo => {
  const { user } = notification.details
  const href = getUserUrn(user.nickname)

  switch (notification.type) {
    case NOTIFICATION_TYPE.NEW_FOLLOWER:
      return {
        emoji: 'following',
        color: 'warning.main',
        href,
      }
    case NOTIFICATION_TYPE.NEW_GOAL:
      return {
        emoji: 'goal',
        color: 'primary.main',
        href: getGoalUrn(href, notification.details.id, notification.details.day),
      }
    case NOTIFICATION_TYPE.ADD_MOTIVATION:
      return {
        emoji: 'motivation',
        color: 'motivation.main',
        href: getGoalUrn(href, notification.details.id, notification.details.day),
      }
    case NOTIFICATION_TYPE.ADD_CREATIVITY:
      return {
        emoji: 'creativity',
        color: 'creativity.main',
        href: getGoalUrn(href, notification.details.id, notification.details.day),
      }
    case NOTIFICATION_TYPE.NEW_QUESTION:
      return {
        emoji: 'question',
        color: 'error.main',
        href: getGoalUrn(href, notification.details.id, notification.details.day),
      }
    case NOTIFICATION_TYPE.NEW_SUPPORT:
      return {
        emoji: 'support',
        color: 'support.main',
        href: getGoalUrn(href, notification.details.id, notification.details.day),
      }
    case NOTIFICATION_TYPE.NEW_ANSWER:
      return {
        emoji: 'support',
        color: 'support.main',
        href: getGoalUrn(href, notification.details.id, notification.details.day),
      }
    default:
      return {
        emoji: 'notification',
        color: 'common.white',
        href: '',
      }
  }
}

export const getNextState = (notifications: NotificationDto[], id: number): NotificationDto[] => {
  return produce(notifications, (draft) => {
    const draftNotification = draft.find((d) => d.id === id)

    if (!draftNotification) return

    draftNotification.read = true
  })
}
