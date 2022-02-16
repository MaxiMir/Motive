import produce from 'immer'
import { InfiniteData } from 'react-query'
import { MessageDto, TopicDto } from 'dto'

export const getNextState = (discussion: InfiniteData<TopicDto[]>, message: MessageDto): InfiniteData<TopicDto[]> => {
  const searchId = message.replyId || message.id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) {
      return
    }

    if (draftTopic.answer) {
      draftTopic.answer.text = message.text
      draftTopic.answer.edited = true
      return
    }

    draftTopic.text = message.text
    draftTopic.edited = true
  })
}
