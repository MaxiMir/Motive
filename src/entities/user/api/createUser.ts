import fetcher from '@shared/api/fetcher'
import { CreateUserDto, UserBaseDto } from '@entities/user/model/dto'

export const createUser = (dto: CreateUserDto): Promise<UserBaseDto> => {
  return fetcher.post('/users', dto)
}
