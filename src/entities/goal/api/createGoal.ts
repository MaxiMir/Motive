import { CreatedGoal, CreateGoalDto } from '@entities/goal/model/dto'
import fetcher from '@shared/api/fetcher'

export const createGoal = (dto: CreateGoalDto): Promise<CreatedGoal> => {
  return fetcher.post('/goals', dto)
}
