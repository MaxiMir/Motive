import { GoalDto, CreateGoalDto, CreateDayDto, DayCharacteristicUpdate, GoalStageDto, CreatedGoal } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class GoalService extends Service {
  /**
   * /goals
   */
  static create(data: CreateGoalDto): Promise<CreatedGoal> {
    return Axios.post('/goals', data)
  }

  /**
   * /goals/{id}/days
   */
  static addDay(data: CreateDayDto): Promise<CreatedGoal> {
    const { id, ...body } = data

    return Axios.post(`/goals/${id}/days`, body)
  }

  /**
   * /goals/{id}/stage
   */
  static updateStage(data: GoalStageDto): Promise<void> {
    const { id, ...body } = data

    return Axios.patch(`/goals/${id}/stage`, body)
  }

  static updateCharacteristic(data: DayCharacteristicUpdate): Promise<void> {
    const { id, dayId, name, add } = data
    const params = GoalService.getOperationParams(add)

    return Axios.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
  }

  /**
   * /goal/{id}/completed
   */
  static setCompleted(data: { id: number; body: FormData }): Promise<GoalDto> {
    const { id, ...body } = data

    return Axios.patch(`/goals/${id}/completed`, body)
  }
}
