import Axios from 'lib/axios'
import { CreateUserDto, UserBaseDto } from 'dto'

export default class UserService {
  static findOrCreate(data: CreateUserDto): Promise<UserBaseDto> {
    return Axios.post('/users', data)
  }
}
