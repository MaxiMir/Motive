import fetcher from '@shared/api/fetcher'
import { CreatedGoal } from '@entities/goal/model/dto'
import { CreateDayDto } from '@app//model/day'

export const createDay = ({ id, ...data }: CreateDayDto): Promise<CreatedGoal> => {
  return fetcher.post(`/goals/${id}/days`, data)
}
