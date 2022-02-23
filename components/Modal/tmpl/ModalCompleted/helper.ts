import { QueryFunctionContext } from 'react-query'
import { GoalCompletedDto } from 'dto'
import GoalService from 'services/GoalService'

export const TAKE = 10
export const PRELOAD_DIFF = 3

export const partialFetcher = (userId: number): ((c: QueryFunctionContext) => Promise<GoalCompletedDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => GoalService.getCompleted(userId, pageParam, TAKE)
}
