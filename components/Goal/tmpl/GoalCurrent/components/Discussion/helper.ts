import { GoalDto, TopicDto } from 'dto'
import PageService from 'services/PageService'
import produce from 'immer'

export const fetcher = (url: string): Promise<TopicDto[]> => PageService.getURL(url)

export const getTopicsCount = (topics: TopicDto[]): number =>
  topics.reduce((acc, t) => acc + (!t.answers?.length ? 1 : 2), 0)

export const mergeTopics = (data: TopicDto[][], newTopic: TopicDto): TopicDto[][] => {
  if (!newTopic.answers?.length) {
    return [[newTopic], ...data]
  }

  return produce(data, (draft) => {
    const draftTopic = draft.flat().find((t) => t.id === newTopic.id)

    if (draftTopic) {
      draftTopic.answers = newTopic.answers
    }
  })
}

export const changeGoals = (goalId: number, goals: GoalDto[], newTopic: TopicDto): GoalDto[] => {
  return produce(goals, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]

    if (newTopic.answers?.length) {
      draftGoal.characteristic.support += 1
    }

    draftGoal.days[0].topicCount += 1
  })
}
