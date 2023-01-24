import { ClientDto } from '@entities/user'
import { MessageDto, MessageType } from '@entities/topic'

export const checkOnDisabled = (message: MessageDto, client?: ClientDto): boolean => {
  return (
    message.user.id === client?.id ||
    (!!message.like && [MessageType.Support, MessageType.Answer].includes(message.type))
  )
}
