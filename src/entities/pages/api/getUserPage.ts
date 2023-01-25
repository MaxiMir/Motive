import { AxiosRequestConfig } from 'axios'
import { UserPageDto } from '@shared/api/user'
import { fetcher } from '@shared/config'

export const getUserPage = (
  nickname: string,
  options?: AxiosRequestConfig,
): Promise<UserPageDto> => {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}
