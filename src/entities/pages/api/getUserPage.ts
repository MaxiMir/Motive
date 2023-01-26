import { AxiosRequestConfig } from 'axios'
import { UserPageDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const getUserPage = (
  nickname: string,
  options?: AxiosRequestConfig,
): Promise<UserPageDto> => {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}
