import Axios from 'lib/axios'
import { Service } from './Service'

export default class SubscriptionService extends Service {
  /**
   * /subscription?operation=add|remove
   */
  static updateFollowing(data: { id: number; add: boolean }): Promise<void> {
    const { id, add } = data
    const operation = SubscriptionService.getOperation(add)

    return Axios.patch(`/subscriptions/${operation}`, { id })
  }
}
