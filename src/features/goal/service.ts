import fetcher from '@lib/fetcher'
import { getFetchParams } from '@helpers/url'
import { CreateDayDto, DayCharacteristicUpdateDto } from '@features/day'
import { CreatedGoal, CreateGoalDto, GoalStageDto } from './dto'

export class GoalService {
  static create(dto: CreateGoalDto): Promise<CreatedGoal> {
    return fetcher.post('/goals', dto)
  }

  static createDay(dto: CreateDayDto): Promise<CreatedGoal> {
    const { id, ...data } = dto

    return fetcher.post(`/goals/${id}/days`, data)
  }

  static updateStage(dto: GoalStageDto): Promise<void> {
    const { id, ...data } = dto

    return fetcher.patch(`/goals/${id}/stage`, data)
  }

  static updateCharacteristic(dto: DayCharacteristicUpdateDto): Promise<void> {
    const { id, dayId, name, add } = dto
    const params = getFetchParams({ insert: add })

    return fetcher.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
  }
}
