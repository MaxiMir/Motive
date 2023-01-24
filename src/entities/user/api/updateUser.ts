import fetcher from '@shared/api/fetcher'
import { UpdateUserDto, UserBaseDto } from '@entities/user/model/dto'

export const updateUser = (id: number, dto: UpdateUserDto): Promise<UserBaseDto> => {
  return fetcher.put(`/users/${id}`, dto)
}
