import { TopicDto, MessageType } from '@entities/topic'

export const checkOnReply = (isOwner: boolean, topic: TopicDto): boolean =>
  isOwner && !topic.answer && topic.type === MessageType.Question
