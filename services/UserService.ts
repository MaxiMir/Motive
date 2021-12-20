import Axios from 'lib/axios'

export default class UserService {
  /**
   * /users/{id}/following/
   */
  static setFollowing(data: { clientId: number; userId: number; add: boolean }): Promise<void> {
    const { clientId, add, ...body } = data

    return Axios.patch(`/users/${clientId}/following/${add ? 'add' : 'remove'}`, body)
  }
}
