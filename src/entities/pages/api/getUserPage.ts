import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/config/fetcher'
import { UserPageDto } from '@shared/api/user'

export const getUserPage = (
  nickname: string,
  options?: AxiosRequestConfig,
): Promise<UserPageDto> => {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}
