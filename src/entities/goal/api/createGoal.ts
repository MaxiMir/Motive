import fetcher from '@shared/config/fetcher'
import { CreatedGoal, CreateGoalDto } from '@shared/api/goal'

export const createGoal = (dto: CreateGoalDto): Promise<CreatedGoal> => {
  return fetcher.post('/goals', dto)
}
