import { ClientDto, MessageDto, MessageType } from 'dto'

export const checkOnText = (message: MessageDto, client?: ClientDto): boolean =>
  message.user.id === client?.id || (!!message.like && [MessageType.SUPPORT, MessageType.ANSWER].includes(message.type))
