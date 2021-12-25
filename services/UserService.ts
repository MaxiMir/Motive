import Axios from 'lib/axios'

export default class UserService {
  /**
   * /users/{id}/following/
   */
  static setFollowing(data: { clientId: number; followingId: number; add: boolean }): Promise<void> {
    const { clientId, followingId, add } = data

    if (!add) {
      return Axios.delete(`/users/${clientId}/following/${followingId}`)
    }

    return Axios.post(`/users/${clientId}/following/`, { followingId })
  }
}
