import { UserBaseDto } from '@shared/api/user'
import fetcher from '@shared/config/fetcher'

export const updateAvatar = (id: number, formData: FormData): Promise<UserBaseDto> => {
  return fetcher.patch(`/users/${id}/avatar`, formData)
}
