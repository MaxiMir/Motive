import { UserBaseDto } from './user'

export const enum MessageType {
  Question = 'question',
  Answer = 'answer',
  Support = 'support',
}

export interface CreateMessageDto {
  readonly dayId: number
  readonly topicId?: number
  readonly type: MessageType
  readonly text: string
}

export interface UpdateMessageDto {
  readonly text: string
}

export interface MessageDto {
  readonly id: number
  readonly date: string
  readonly text: string
  readonly user: UserBaseDto
  readonly like?: boolean
  readonly likeCount: number
  readonly goalId: number
  readonly dayId: number
  readonly parentId: number | null
  readonly type: MessageType
  readonly edited: boolean
}

export interface TopicDto extends MessageDto {
  readonly type: MessageType
  readonly answer: MessageDto | null
}
