import { CreateDayDto, DayPointsUpdateDto } from '../day'
import { fetcher } from '../fetcher'
import { getFilterParams } from '../filter'
import { CreatedGoal, CreateGoalDto, UpdateStageDto } from './dto'

export function createDay({ id, ...data }: CreateDayDto): Promise<CreatedGoal> {
  return fetcher.post(`/goals/${id}/days`, data)
}

export function createGoal(dto: CreateGoalDto): Promise<CreatedGoal> {
  return fetcher.post('/goals', dto)
}

export function updatePoints(dto: DayPointsUpdateDto): Promise<void> {
  const { id, dayId, add } = dto
  const params = getFilterParams({ insert: add })

  return fetcher.patch(`/goals/${id}/days/${dayId}/points`, { id }, { params })
}

export function updateStage({ id, ...data }: UpdateStageDto): Promise<void> {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
