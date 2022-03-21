import { CreateGoalDto, CreateDayDto, DayCharacteristicUpdateDto, GoalStageDto, CreatedGoal } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class GoalService extends Service {
  static create(dto: CreateGoalDto): Promise<CreatedGoal> {
    return Axios.post('/goals', dto)
  }

  static createDay(dto: CreateDayDto): Promise<CreatedGoal> {
    const { id, ...data } = dto

    return Axios.post(`/goals/${id}/days`, data)
  }

  static updateStage(dto: GoalStageDto): Promise<void> {
    const { id, ...data } = dto

    return Axios.patch(`/goals/${id}/stage`, data)
  }

  static updateCharacteristic(dto: DayCharacteristicUpdateDto): Promise<void> {
    const { id, dayId, name, add } = dto
    const params = GoalService.getOperationParams(add)

    return Axios.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
  }
}
