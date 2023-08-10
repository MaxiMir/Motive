import { TopicDto } from 'shared/api'

export function checkOnReply(isOwner: boolean, topic: TopicDto): boolean {
  return isOwner && !topic.answer && topic.type === 'question'
}
