import { UserPage } from 'dto'
import Axios from 'lib/axios'

export default class UserService {
  static async getById(nickname: string): Promise<UserPage> {
    return Axios.get(`/pages/users${nickname}`, { validateStatus: () => true })
  }
}
