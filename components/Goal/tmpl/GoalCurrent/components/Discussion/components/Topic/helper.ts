import { RoleDto, TopicDto, MessageType } from 'dto'

export const checkOnReply = (role: RoleDto, topic: TopicDto): boolean =>
  role === 'OWNER' && !topic.answer && topic.type === MessageType.QUESTION
