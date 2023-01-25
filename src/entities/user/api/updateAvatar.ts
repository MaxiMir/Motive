import { UserBaseDto } from '@entities/user/model/dto'
import fetcher from '@shared/api/fetcher'

export const updateAvatar = (id: number, formData: FormData): Promise<UserBaseDto> => {
  return fetcher.patch(`/users/${id}/avatar`, formData)
}
