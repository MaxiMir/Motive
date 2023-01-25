import fetcher from '@shared/api/fetcher'
import { CreatedGoal, CreateGoalDto } from '@entities/goal/model/dto'

export const createGoal = (dto: CreateGoalDto): Promise<CreatedGoal> => {
  return fetcher.post('/goals', dto)
}
