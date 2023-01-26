import { CreateUserDto, UserBaseDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createUser = (dto: CreateUserDto): Promise<UserBaseDto> => {
  return fetcher.post('/users', dto)
}
