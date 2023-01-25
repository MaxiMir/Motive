import { AxiosRequestConfig } from 'axios'
import { UserPageDto } from '@entities/user/model/dto'
import fetcher from '@shared/api/fetcher'

export const getUserPage = (
  nickname: string,
  options?: AxiosRequestConfig,
): Promise<UserPageDto> => {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}
