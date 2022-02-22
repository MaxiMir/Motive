import { QueryFunctionContext } from 'react-query'
import { GoalDto } from 'dto'
import GoalService from 'services/GoalService'

export const TAKE = 10
export const PRELOAD_DIFF = 3

export const partialFetcher = (userId: number): ((c: QueryFunctionContext) => Promise<GoalDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => GoalService.get(userId, true, pageParam, TAKE)
}
