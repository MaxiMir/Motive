import fetcher from '@shared/config/fetcher'
import { CreateUserDto, UserBaseDto } from '@shared/api/user'

export const createUser = (dto: CreateUserDto): Promise<UserBaseDto> => {
  return fetcher.post('/users', dto)
}
