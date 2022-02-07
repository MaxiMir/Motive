import { GoalDto, TopicDto } from 'dto'
import produce from 'immer'

export const LIMIT_TOPICS = 4
export const PRELOAD_DIFF = 1

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

export const changeGoals = (goalId: number, goals: GoalDto[]): GoalDto[] => {
  return produce(goals, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]

    draftGoal.day.topicCount += 1
  })
}
