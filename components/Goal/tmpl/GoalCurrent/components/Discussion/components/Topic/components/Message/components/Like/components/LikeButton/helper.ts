import { InfiniteData } from 'react-query'
import produce from 'immer'
import { MessageDto, TopicDto } from 'dto'
import TopicService from 'services/TopicService'

export type Options = { message: MessageDto; answerFor?: number; add: boolean }
export type Context = { previous?: InfiniteData<TopicDto[]> }

export const fetcher = ({ message, add }: Options): Promise<void> => TopicService.updateLike(message.id, add)

export const getNextState = (discussion: InfiniteData<TopicDto[]>, options: Options): InfiniteData<TopicDto[]> => {
  const { message, answerFor, add } = options
  const searchId = answerFor || message.id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) {
      return
    }

    if (answerFor && draftTopic.answer) {
      draftTopic.answer.like = add
      draftTopic.answer.likeCount += add ? 1 : -1
      return
    }

    draftTopic.like = add
    draftTopic.likeCount += add ? 1 : -1
  })
}

export const getTitle = (icon: 'like' | 'support', like?: boolean): string =>
  icon === 'like' ? `Like${!like ? '' : 'd'} the question` : `Mark${!like ? '' : 'ed'} as very helpful`
