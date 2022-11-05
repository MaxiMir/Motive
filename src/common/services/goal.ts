import { CreateGoalDto, CreateDayDto, DayCharacteristicUpdateDto, GoalStageDto, CreatedGoal } from '@dto'
import { service } from '@utils/service'
import { Service } from './Service'

export class GoalService extends Service {
  static create(dto: CreateGoalDto): Promise<CreatedGoal> {
    return service.post('/goals', dto)
  }

  static createDay(dto: CreateDayDto): Promise<CreatedGoal> {
    const { id, ...data } = dto

    return service.post(`/goals/${id}/days`, data)
  }

  static updateStage(dto: GoalStageDto): Promise<void> {
    const { id, ...data } = dto

    return service.patch(`/goals/${id}/stage`, data)
  }

  static updateCharacteristic(dto: DayCharacteristicUpdateDto): Promise<void> {
    const { id, dayId, name, add } = dto
    const params = GoalService.getOperationParams(add)

    return service.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
  }
}
