import { CalendarDto, GoalDto, GoalCreationDto, TaskCreationDto } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class GoalService extends Service {
  /**
   * /goals
   */
  static create(data: GoalCreationDto): Promise<GoalDto> {
    return Axios.post('/goals', data)
  }

  /**
   * /goals/{id}/days
   */
  static addDay(data: { id: number; tasks: TaskCreationDto[] }): Promise<GoalDto> {
    const { id, ...body } = data

    return Axios.post(`/goals/${id}/days`, body)
  }

  /**
   * /goals/{id}/calendar
   */
  static getCalendar(data: { id: number }): Promise<CalendarDto[]> {
    const { id } = data

    return Axios.get(`/goals/${id}/calendar`)
  }

  /**
   * /goal/{id}/days/{dayId}/characteristic/{characteristicName}?operation=add|remove
   */
  static updateCharacteristic(data: { id: number; dayId: number; name: string; add: boolean }): Promise<void> {
    const { id, dayId, name, add } = data
    const operation = GoalService.getOperation(add)

    return Axios.patch(`/goals/${id}/days/${dayId}/characteristic/${name}/${operation}`, { id })
  }
}
