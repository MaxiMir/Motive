import Axios from 'lib/axios'
import { CreateUserDto, UserBaseDto } from 'dto'
import { Service, WhereParams } from './Service'

export default class UserService extends Service {
  static create(dto: CreateUserDto): Promise<UserBaseDto> {
    return Axios.post('/users', dto)
  }

  static find(where: WhereParams, page: number, take: number): Promise<UserBaseDto[]> {
    const whereParams = UserService.getWhereParams(where)
    const paginationParams = UserService.getPaginationParams(page, take)

    return Axios.get('/users', {
      params: { ...whereParams, ...paginationParams },
    })
  }

  static update({ id, formData }: { id: number; formData: FormData }): Promise<UserBaseDto> {
    return Axios.patch(`/users/${id}`, formData)
  }
}
