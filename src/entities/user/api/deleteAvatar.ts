import { UserBaseDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const deleteAvatar = (id: number): Promise<UserBaseDto> => {
  return fetcher.delete(`/users/${id}/avatar`)
}
