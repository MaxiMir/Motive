import { CreateDayDto } from '@app/model/day'
import { CreatedGoal } from '@entities/goal/model/dto'
import fetcher from '@shared/api/fetcher'

export const createDay = ({ id, ...data }: CreateDayDto): Promise<CreatedGoal> => {
  return fetcher.post(`/goals/${id}/days`, data)
}
