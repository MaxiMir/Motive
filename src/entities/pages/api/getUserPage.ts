import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/api/fetcher'
import { UserPageDto } from '@entities/user/model/dto'

export const getUserPage = (
  nickname: string,
  options?: AxiosRequestConfig,
): Promise<UserPageDto> => {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}
