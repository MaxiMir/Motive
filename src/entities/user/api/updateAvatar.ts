import fetcher from '@shared/config/fetcher'
import { UserBaseDto } from '@shared/api/user'

export const updateAvatar = (id: number, formData: FormData): Promise<UserBaseDto> => {
  return fetcher.patch(`/users/${id}/avatar`, formData)
}
