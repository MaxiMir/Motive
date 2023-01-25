import { MessageDto, MessageType } from '@shared/api/topic'
import { ClientDto } from '@shared/api/user'

export const checkOnDisabled = (message: MessageDto, client?: ClientDto): boolean => {
  return (
    message.user.id === client?.id ||
    (!!message.like && [MessageType.Support, MessageType.Answer].includes(message.type))
  )
}
