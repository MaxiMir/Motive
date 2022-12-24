import fetcher from '@lib/fetcher'
import { Filter, getFilterParams } from '@helpers/url'
import { CreateUserDto, UpdateUserDto, UserBaseDto } from './dto'

export class UserService {
  static create(dto: CreateUserDto): Promise<UserBaseDto> {
    return fetcher.post('/users', dto)
  }

  static get(filter: Filter): Promise<UserBaseDto[]> {
    const params = getFilterParams(filter)

    return fetcher.get('/users', { params })
  }

  static update(id: number, dto: UpdateUserDto): Promise<UserBaseDto> {
    return fetcher.put(`/users/${id}`, dto)
  }

  static updateAvatar(id: number, formData: FormData): Promise<UserBaseDto> {
    return fetcher.patch(`/users/${id}/avatar`, formData)
  }

  static deleteAvatar(id: number): Promise<UserBaseDto> {
    return fetcher.delete(`/users/${id}/avatar`)
  }
}
