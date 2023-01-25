import fetcher from '@shared/config/fetcher'
import { UpdateUserDto, UserBaseDto } from '@shared/api/user'

export const updateUser = (id: number, dto: UpdateUserDto): Promise<UserBaseDto> => {
  return fetcher.put(`/users/${id}`, dto)
}
