import { ClientDto } from '@features/user'
import { MessageDto, MessageType } from '@features/topic'

type CheckOnDisabled = (message: MessageDto, client?: ClientDto) => boolean

export const checkOnDisabled: CheckOnDisabled = (message, client) => {
  return (
    message.user.id === client?.id ||
    (!!message.like && [MessageType.Support, MessageType.Answer].includes(message.type))
  )
}
