import { CreateDayDto, DayCharacteristicUpdateDto } from '../day'
import { fetcher } from '../fetcher'
import { getFilterParams } from '../filter'
import { CreatedGoal, CreateGoalDto } from './model'

export const createDay = ({ id, ...data }: CreateDayDto): Promise<CreatedGoal> => {
  return fetcher.post(`/goals/${id}/days`, data)
}

export const createGoal = (dto: CreateGoalDto): Promise<CreatedGoal> => {
  return fetcher.post('/goals', dto)
}

export const updateCharacteristic = (dto: DayCharacteristicUpdateDto): Promise<void> => {
  const { id, dayId, name, add } = dto
  const params = getFilterParams({ insert: add })

  return fetcher.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
}

export const updateStage = ({ id, ...data }: DayCharacteristicUpdateDto): Promise<void> => {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
