import Axios from 'lib/axios'

export default class UserService {
  /**
   * /users/{id}/following/
   */
  static setFollowing(data: { clientId: number; following: number; add: boolean }): Promise<void> {
    const { clientId, add, following } = data

    return Axios.patch(`/users/${clientId}/following/`, { op: add ? 'add' : 'remove', following })
  }
}
