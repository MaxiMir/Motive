import produce from 'immer'
import { FeedbackDto, GoalDto } from 'dto'

export const getNextState = (goals: GoalDto[], goalId: number, feedback: FeedbackDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day.feedback = feedback
  })
