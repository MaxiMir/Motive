import { AxiosResponse } from 'axios'
import Axios from 'lib/axios'

export default class FavoriteService {
  /**
   * /favorite/user/
   */
  static setUser({ ...data }: { nickname: string; favorite: boolean }): Promise<AxiosResponse> {
    return Axios.put(`/favorite/user/`, data)
  }
}
