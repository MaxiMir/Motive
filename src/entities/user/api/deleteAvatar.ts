import fetcher from '@shared/api/fetcher'
import { UserBaseDto } from '@entities/user/model/dto'

export const deleteAvatar = (id: number): Promise<UserBaseDto> => {
  return fetcher.delete(`/users/${id}/avatar`)
}
