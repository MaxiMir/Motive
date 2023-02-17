import { MessageDto, TopicType, ClientDto } from 'shared/api'

export const checkOnDisabled = (message: MessageDto, client?: ClientDto): boolean => {
  return (
    message.user.id === client?.id ||
    (!!message.like && [TopicType.Support, TopicType.Answer].includes(message.type))
  )
}
