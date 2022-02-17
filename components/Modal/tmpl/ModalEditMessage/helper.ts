import produce from 'immer'
import { InfiniteData } from 'react-query'
import { MessageDto, TopicDto } from 'dto'

export const getNextState = (discussion: InfiniteData<TopicDto[]>, message: MessageDto): InfiniteData<TopicDto[]> => {
  const { id, parentId, text } = message
  const searchId = parentId || id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) {
      return
    }

    if (parentId && draftTopic.answer) {
      draftTopic.answer.text = text
      draftTopic.answer.edited = true
      return
    }

    draftTopic.text = text
    draftTopic.edited = true
  })
}
