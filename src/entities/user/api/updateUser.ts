import { UpdateUserDto, UserBaseDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const updateUser = (id: number, dto: UpdateUserDto): Promise<UserBaseDto> => {
  return fetcher.put(`/users/${id}`, dto)
}
