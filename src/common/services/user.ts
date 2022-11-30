import { CreateUserDto, UpdateUserDto, UserBaseDto } from '@dto'
import fetcher from '@utils/fetcher'
import Service, { WhereParams } from './Service'

interface UpdateParams {
  id: number
  data: UpdateUserDto
}

interface UpdateAvatarParams {
  id: number
  formData: FormData
}

export default class UserService extends Service {
  static create(dto: CreateUserDto): Promise<UserBaseDto> {
    return fetcher.post('/users', dto)
  }

  static get(where: WhereParams, page: number, take: number): Promise<UserBaseDto[]> {
    const whereParams = UserService.getWhereParams(where)
    const paginationParams = UserService.getPaginationParams(page, take)

    return fetcher.get('/users', {
      params: { ...whereParams, ...paginationParams },
    })
  }

  static update({ id, data }: UpdateParams): Promise<UserBaseDto> {
    return fetcher.put(`/users/${id}`, data)
  }

  static updateAvatar({ id, formData }: UpdateAvatarParams): Promise<UserBaseDto> {
    return fetcher.patch(`/users/${id}/avatar`, formData)
  }
}
