import { UserBaseDto } from '@shared/api/user'
import { fetcher } from '@shared/config'

export const deleteAvatar = (id: number): Promise<UserBaseDto> => {
  return fetcher.delete(`/users/${id}/avatar`)
}
