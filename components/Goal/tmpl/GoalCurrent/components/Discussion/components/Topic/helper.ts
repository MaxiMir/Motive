import { RoleDto, TopicDto, TopicType } from 'dto'

export const checkOnReply = (role: RoleDto, topic: TopicDto): boolean =>
  role === 'OWNER' && !topic.answers?.length && topic.type === TopicType.QUESTION
