import { TopicDto, MessageType } from '@features/topic'

type CheckOnReply = (isOwner: boolean, topic: TopicDto) => boolean

export const checkOnReply: CheckOnReply = (isOwner, topic) =>
  isOwner && !topic.answer && topic.type === MessageType.Question
