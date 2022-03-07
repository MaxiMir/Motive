import { TopicDto, MessageType } from 'dto'

export const checkOnReply = (isGoalOwner: boolean, topic: TopicDto): boolean =>
  isGoalOwner && !topic.answer && topic.type === MessageType.QUESTION
