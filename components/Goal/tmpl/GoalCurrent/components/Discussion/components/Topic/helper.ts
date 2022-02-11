import { RoleDto, TopicDto, TopicType } from 'dto'

export const checkOnReply = (role: RoleDto, topic: TopicDto): boolean =>
  role === 'OWNER' && !topic.answer && topic.type === TopicType.QUESTION
