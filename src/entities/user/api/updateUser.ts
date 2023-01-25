import { UpdateUserDto, UserBaseDto } from '@shared/api/user'
import { fetcher } from '@shared/config'

export const updateUser = (id: number, dto: UpdateUserDto): Promise<UserBaseDto> => {
  return fetcher.put(`/users/${id}`, dto)
}
