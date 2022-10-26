import { service } from '@utils/service'
import { CreateUserDto, UpdateUserDto, UserBaseDto } from '@dto'
import { Service, WhereParams } from './Service'

interface UpdateParams {
  id: number
  data: UpdateUserDto
}
interface UpdateAvatarParams {
  id: number
  formData: FormData
}

export class UserService extends Service {
  static create(dto: CreateUserDto): Promise<UserBaseDto> {
    return service.post('/users', dto)
  }

  static get(where: WhereParams, page: number, take: number): Promise<UserBaseDto[]> {
    const whereParams = UserService.getWhereParams(where)
    const paginationParams = UserService.getPaginationParams(page, take)

    return service.get('/users', {
      params: { ...whereParams, ...paginationParams },
    })
  }

  static update({ id, data }: UpdateParams): Promise<UserBaseDto> {
    return service.put(`/users/${id}`, data)
  }

  static updateAvatar({ id, formData }: UpdateAvatarParams): Promise<UserBaseDto> {
    return service.patch(`/users/${id}/avatar`, formData)
  }
}
