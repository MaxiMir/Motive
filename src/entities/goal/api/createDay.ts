import fetcher from '@shared/config/fetcher'
import { CreateDayDto } from '@shared/api/day'
import { CreatedGoal } from '@shared/api/goal'

export const createDay = ({ id, ...data }: CreateDayDto): Promise<CreatedGoal> => {
  return fetcher.post(`/goals/${id}/days`, data)
}
