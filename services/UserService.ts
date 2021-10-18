import { AxiosResponse } from 'axios'
import Axios from 'lib/axios'

export default class UserService {
  // /users/{id}/favorites
  static setFavorite({ userId, ...data }: { userId: string; id: string; favorite: boolean }): Promise<AxiosResponse> {
    return Axios.put(`/users/${userId}/favorites`, data)
  }
}
