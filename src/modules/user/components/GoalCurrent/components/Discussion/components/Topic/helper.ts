import { TopicDto, MessageType } from '@dto'

export const checkOnReply = (isOwner: boolean, topic: TopicDto): boolean =>
  isOwner && !topic.answer && topic.type === MessageType.Question
