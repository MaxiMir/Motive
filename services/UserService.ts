import Axios from 'lib/axios'

export default class UserService {
  /**
   * /favorites
   */
  static updateFavorite(data: { userId: number; favorite: boolean }): Promise<void> {
    return Axios.patch(`/users/favorites/`, data)
  }
}
