import { ClientDto } from '@features/user'
import { MessageDto, MessageType } from '@features/topic'

export const checkOnDisabled = (message: MessageDto, client?: ClientDto): boolean => {
  return (
    message.user.id === client?.id ||
    (!!message.like && [MessageType.Support, MessageType.Answer].includes(message.type))
  )
}
