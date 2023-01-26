import { CreateDayDto, CreatedGoal } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createDay = ({ id, ...data }: CreateDayDto): Promise<CreatedGoal> => {
  return fetcher.post(`/goals/${id}/days`, data)
}
