import { CreateDayDto } from '../day'
import { fetcher } from '../fetcher'
import { getFilterParams } from '../filter'
import { CreatedGoal, CreateGoalDto, GoalBaseDto, UpdateStageDto } from './dto'

export function createDay(id: number, dto: CreateDayDto): Promise<CreatedGoal> {
  return fetcher.post(`/goals/${id}/days`, dto)
}

export function createGoal(dto: CreateGoalDto): Promise<CreatedGoal> {
  return fetcher.post('/goals', dto)
}

export function updatePoints(id: number, dayId: number, insert: boolean): Promise<void> {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/goals/${id}/days/${dayId}/points`, undefined, { params })
}

export function updateStage(id: number, dto: UpdateStageDto): Promise<void> {
  return fetcher.patch(`/goals/${id}/stage`, dto)
}

export function updateCover(id: number, formData: FormData): Promise<GoalBaseDto> {
  return fetcher.patch(`/goals/${id}/cover`, formData)
}

export function deleteCover(id: number): Promise<GoalBaseDto> {
  return fetcher.delete(`/goals/${id}/cover`)
}
