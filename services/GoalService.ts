import {
  GoalDto,
  CreateGoalDto,
  CreateDayDto,
  DayCharacteristicUpdateDto,
  GoalStageDto,
  CreatedGoal,
  GoalCompletedDto,
} from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class GoalService extends Service {
  static create(data: CreateGoalDto): Promise<CreatedGoal> {
    return Axios.post('/goals', data)
  }

  static getCompleted(owner: number, page: number, take: number): Promise<GoalCompletedDto[]> {
    const pagination = GoalService.getPaginationParams(page, take)

    return Axios.get('/goals', {
      params: { 'where[owner]': owner, 'where[confirmation]': true, ...pagination },
    })
  }

  static addDay(dto: CreateDayDto): Promise<CreatedGoal> {
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

  static updateConfirmation(data: { id: number; body: FormData }): Promise<GoalDto> {
    const { id, body } = data

    return Axios.patch(`/goals/${id}/confirmation`, body)
  }
}
