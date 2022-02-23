import {
  GoalDto,
  CreateGoalDto,
  CreateDayDto,
  DayCharacteristicUpdate,
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

  static addDay(data: CreateDayDto): Promise<CreatedGoal> {
    const { id, ...body } = data

    return Axios.post(`/goals/${id}/days`, body)
  }

  static updateStage(data: GoalStageDto): Promise<void> {
    const { id, ...body } = data

    return Axios.patch(`/goals/${id}/stage`, body)
  }

  static updateCharacteristic(data: DayCharacteristicUpdate): Promise<void> {
    const { id, dayId, name, add } = data
    const params = GoalService.getOperationParams(add)

    return Axios.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
  }

  static updateConfirmation(data: { id: number; body: FormData }): Promise<GoalDto> {
    const { id, body } = data

    return Axios.patch(`/goals/${id}/confirmation`, body)
  }
}
