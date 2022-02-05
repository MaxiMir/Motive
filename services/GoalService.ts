import { GoalDto, GoalCreationDto, DayCreationDto, DayCharacteristicUpdate, GoalStageDto, CreatedGoal } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class GoalService extends Service {
  /**
   * /goals
   */
  static create(data: GoalCreationDto): Promise<CreatedGoal> {
    return Axios.post('/goals', data)
  }

  /**
   * /goals/{id}/days
   */
  static addDay(data: DayCreationDto): Promise<GoalDto> {
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

  /**
   * /goal/{id}/days/{dayId}/characteristic/{characteristicName}?operation=add|remove
   */
  static updateCharacteristic(data: DayCharacteristicUpdate): Promise<GoalDto> {
    const { id, dayId, name, add } = data
    const operation = GoalService.getOperation(add)

    return Axios.patch(`/goals/${id}/days/${dayId}/characteristic/${name}${operation}`, { id })
  }

  /**
   * /goal/{id}/completed
   */
  static setCompleted(data: { id: number; body: FormData }): Promise<GoalDto> {
    const { id, ...body } = data

    return Axios.post(`/goals/${id}/completed`, body)
  }
}
