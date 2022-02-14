import { MessageDto, TopicType, UserBaseDto } from 'dto'

export const checkOnText = (message: MessageDto, client?: UserBaseDto): boolean => {
  return message.user.id === client?.id || (!!message.like && message.type === TopicType.SUPPORT)
}

export const getTitle = (icon: 'like' | 'support', like?: boolean): string =>
  icon === 'like' ? `Like${!like ? '' : 'd'} the question` : `Mark${!like ? '' : 'ed'} as very helpful`
