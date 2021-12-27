import { CalendarDto, GoalDto, GoalCreationDto } from 'dto'
import Axios from 'lib/axios'

export default class GoalService {
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
}
