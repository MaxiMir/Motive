import { CreateUserDto, UserBaseDto } from '@shared/api/user'
import { fetcher } from '@shared/config'

export const createUser = (dto: CreateUserDto): Promise<UserBaseDto> => {
  return fetcher.post('/users', dto)
}
