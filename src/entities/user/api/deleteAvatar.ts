import fetcher from '@shared/config/fetcher'
import { UserBaseDto } from '@shared/api/user'

export const deleteAvatar = (id: number): Promise<UserBaseDto> => {
  return fetcher.delete(`/users/${id}/avatar`)
}
