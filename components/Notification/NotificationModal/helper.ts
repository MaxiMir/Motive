import produce from 'immer'
import { ClientDto, NOTIFICATION_TYPE, NotificationDto } from 'dto'
import { getDiscussionUrn, getFeedbackUrn, getGoalUrn, getGoalWithDayUrn, getUserUrn } from 'helpers/url'
import { toShortString } from 'helpers/prepare'
import { AppEmojiName } from 'components/UI/AppEmoji'

type NotificationInfo = { emoji: AppEmojiName; color: string }

export const getNotificationInfo = (type: NOTIFICATION_TYPE): NotificationInfo => {
  switch (type) {
    case NOTIFICATION_TYPE.NEW_FOLLOWER:
      return { emoji: 'following', color: 'warning.main' }
    case NOTIFICATION_TYPE.NEW_GOAL:
      return { emoji: 'goal', color: 'primary.main' }
    case NOTIFICATION_TYPE.ADD_MOTIVATION:
      return { emoji: 'motivation', color: 'motivation.main' }
    case NOTIFICATION_TYPE.ADD_CREATIVITY:
      return { emoji: 'creativity', color: 'creativity.main' }
    case NOTIFICATION_TYPE.NEW_QUESTION:
      return { emoji: 'question', color: 'error.main' }
    case NOTIFICATION_TYPE.NEW_SUPPORT:
      return { emoji: 'support', color: 'support.main' }
    case NOTIFICATION_TYPE.NEW_ANSWER:
      return { emoji: 'support', color: 'support.main' }
    case NOTIFICATION_TYPE.NEW_FEEDBACK:
      return { emoji: 'feedback', color: '#cfd8dc' }
    case NOTIFICATION_TYPE.WEB_COVERAGE:
      return { emoji: 'web', color: 'abandoned.main' }
    default:
      return { emoji: 'notification', color: 'common.white' }
  }
}

export const getNotificationUrn = (notification: NotificationDto, client?: ClientDto): string => {
  const { user } = notification.details
  const userPage = [
    NOTIFICATION_TYPE.NEW_FOLLOWER,
    NOTIFICATION_TYPE.NEW_GOAL,
    NOTIFICATION_TYPE.NEW_ANSWER,
    NOTIFICATION_TYPE.NEW_FEEDBACK,
    NOTIFICATION_TYPE.WEB_COVERAGE,
  ].includes(notification.type)
  const nickname = userPage ? user.nickname : client?.nickname || ''

  switch (notification.type) {
    case NOTIFICATION_TYPE.NEW_FOLLOWER:
      return getUserUrn(nickname)
    case NOTIFICATION_TYPE.WEB_COVERAGE:
      return getGoalUrn(nickname, notification.details.id)
    case NOTIFICATION_TYPE.NEW_FEEDBACK:
      return getFeedbackUrn(nickname, notification.details.id, notification.details.day)
    case NOTIFICATION_TYPE.NEW_QUESTION:
    case NOTIFICATION_TYPE.NEW_ANSWER:
    case NOTIFICATION_TYPE.NEW_SUPPORT:
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
