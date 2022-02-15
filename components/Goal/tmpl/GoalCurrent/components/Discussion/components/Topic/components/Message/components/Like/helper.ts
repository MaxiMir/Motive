import { MessageDto, MessageType, UserBaseDto } from 'dto'

export const checkOnText = (message: MessageDto, client?: UserBaseDto): boolean =>
  message.user.id === client?.id || (!!message.like && [MessageType.SUPPORT, MessageType.ANSWER].includes(message.type))
