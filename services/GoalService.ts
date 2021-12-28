import { CalendarDto, GoalDto, GoalCreationDto } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class GoalService extends Service {
  /**
   * /goals
   */
  static create(data: GoalCreationDto): Promise<GoalDto> {
    return Axios.post('/goals/', data)
  }

  /**
   * /goals/{id}/calendar
   */
  static getCalendar(data: { id: number }): Promise<CalendarDto[]> {
    const { id } = data

    return Axios.get(`/goals/${id}/calendar`)
  }

  /**
   * /goal/{id}/{dayId}/{characteristic}/{add | remove}
   */
  static updateCharacteristic(data: { id: number; dayId: number; name: string; add: boolean }): Promise<void> {
    const { id, dayId, name, add } = data
    const operation = GoalService.getOperation(add)

    return Axios.post(`/goals/${id}/${dayId}/${name}/${operation}`, { id })
  }
}
