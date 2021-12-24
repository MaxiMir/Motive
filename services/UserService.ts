import Axios from 'lib/axios'

export default class UserService {
  /**
   * /users/{id}/following/
   */
  static setFollowing(data: { clientId: number; following: number; add: boolean }): Promise<void> {
    const { clientId, following, add } = data

    if (!add) {
      return Axios.delete(`/users/${clientId}/following/${following}`)
    }

    return Axios.post(`/users/${clientId}/following/`, { following })
  }
}
