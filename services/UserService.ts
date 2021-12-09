import { UserPage } from 'dto'
import Axios from 'lib/axios'

export default class UserService {
  static async getById(id: string): Promise<UserPage> {
    return Axios.get(`/users${id}`, { validateStatus: () => true })
  }
}
