import { Viewer } from 'entities/viewer'
import { MessageDto } from 'shared/api'

export function checkOnDisabled(message: MessageDto, viewer?: Viewer): boolean {
  return (
    message.user.id === viewer?.id ||
    (!!message.like && ['support', 'answer'].includes(message.type))
  )
}
