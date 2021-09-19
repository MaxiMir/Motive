import { AxiosResponse } from 'axios'
import Axios from 'lib/axios'
import { toUrn } from 'helpers/url'

const getBaseUrl = (...urnParts: string[]) => toUrn('users', ...urnParts)

export default class UserService {
  static increaseViews({ userId }: { userId: string }): Promise<AxiosResponse> {
    return Axios.put(getBaseUrl(userId, 'views'))
  }

  static setFavorite({ userId, ...data }: { userId: string; id: string; favorite: boolean }): Promise<AxiosResponse> {
    return Axios.put(getBaseUrl(userId, 'favorites'), data)
  }
}
