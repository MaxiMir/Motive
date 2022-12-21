import fetcher from '@lib/fetcher'
import { FetchParams, getFetchParams } from '@helpers/url'
import { CreateUserDto, UpdateUserDto, UserBaseDto } from './dto'

interface UpdateParams {
  id: number
  data: UpdateUserDto
}

export class UserService {
  static create(dto: CreateUserDto): Promise<UserBaseDto> {
    return fetcher.post('/users', dto)
  }

  static get(fetchParams: FetchParams): Promise<UserBaseDto[]> {
    const params = getFetchParams(fetchParams)

    return fetcher.get('/users', { params })
  }

  static update({ id, data }: UpdateParams): Promise<UserBaseDto> {
    return fetcher.put(`/users/${id}`, data)
  }

  static updateAvatar(id: number, formData: FormData): Promise<UserBaseDto> {
    return fetcher.patch(`/users/${id}/avatar`, formData)
  }
}
