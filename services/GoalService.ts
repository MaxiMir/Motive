import { Goal, GoalCreation } from 'dto'
import Axios from 'lib/axios'

export default class GoalService {
  static create(data: GoalCreation): Promise<Goal> {
    return Axios.post('/goals', data)
  }
}
