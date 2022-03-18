import { QueryFunctionContext } from 'react-query'
import { ConfirmationDto } from 'dto'
import ConfirmationService from 'services/ConfirmationService'

export const TAKE = 10
export const PRELOAD_DIFF = 3

export const partialFetcher = (userId: number): ((c: QueryFunctionContext) => Promise<ConfirmationDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => ConfirmationService.getByUser(userId, pageParam, TAKE)
}