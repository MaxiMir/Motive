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
  static getDates(data: { dayId: number }): Promise<CalendarDto[]> {
    const { dayId } = data

    return Axios.get(`/goals/${dayId}/calendar`)
  }
}
