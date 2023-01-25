import { CreatedGoal, CreateGoalDto } from '@shared/api/goal'
import fetcher from '@shared/config/fetcher'

export const createGoal = (dto: CreateGoalDto): Promise<CreatedGoal> => {
  return fetcher.post('/goals', dto)
}
