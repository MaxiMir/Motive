import produce from 'immer'
import { GoalDto, FeedbackDto } from 'dto'

export const getGoalNextState = (goals: GoalDto[], goalId: number, feedback: FeedbackDto): GoalDto[] =>
  produce(goals, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day.feedback = feedback
  })
