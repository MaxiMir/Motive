import { TopicDto, MessageType } from '@shared/api/topic'

export const checkOnReply = (isOwner: boolean, topic: TopicDto): boolean =>
  isOwner && !topic.answer && topic.type === MessageType.Question
