import { Goal, GoalCreation } from 'dto'
import Axios from 'lib/axios'
import { toUrn } from 'helpers/url'

const getBaseUrl = (...urnParts: string[]) => toUrn('goals', ...urnParts)

export default class GoalService {
  static create(data: GoalCreation): Promise<Goal> {
    return Axios.post(getBaseUrl(), data)
  }
}
