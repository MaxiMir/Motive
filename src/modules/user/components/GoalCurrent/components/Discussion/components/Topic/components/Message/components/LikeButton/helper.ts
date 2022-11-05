import produce from 'immer'
import { InfiniteData } from 'react-query'
import { ClientDto, GoalDto, MessageDto, MessageType, TopicDto } from '@dto'
import { TopicService } from '@services/topic'

export interface Options {
  message: MessageDto
  answerFor?: number
  add: boolean
}

export interface Context {
  previous?: InfiniteData<TopicDto[]>
}

export const checkOnDisabled = (message: MessageDto, client?: ClientDto): boolean =>
  message.user.id === client?.id || (!!message.like && [MessageType.Support, MessageType.Answer].includes(message.type))

export const fetcher = ({ message, add }: Options): Promise<void> => TopicService.updateLike(message.id, add)

export const getNextState = (discussion: InfiniteData<TopicDto[]>, options: Options): InfiniteData<TopicDto[]> => {
  const { message, answerFor, add } = options
  const searchId = answerFor || message.id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) return

    if (answerFor && draftTopic.answer) {
      draftTopic.answer.like = add
      draftTopic.answer.likeCount += add ? 1 : -1
      return
    }

    draftTopic.like = add
    draftTopic.likeCount += add ? 1 : -1
  })
}

export const getGoalNextState = (goals: GoalDto[], goalId: number, add: boolean): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.characteristic.support += add ? 1 : -1
  })
