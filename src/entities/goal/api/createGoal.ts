import { CreatedGoal, CreateGoalDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createGoal = (dto: CreateGoalDto): Promise<CreatedGoal> => {
  return fetcher.post('/goals', dto)
}
