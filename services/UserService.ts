import { AxiosResponse } from 'axios'
import Axios from 'lib/axios'
import { toUrn } from 'helpers/url'

const getBaseUrl = (...urnParts: string[]) => toUrn('users', ...urnParts)

export default class UserService {
  static increaseViews({ id }: { id: string }): Promise<AxiosResponse> {
    return Axios.put(getBaseUrl(id, 'page-views'))
  }

  static setFavorite({ id, ...data }: { id: string; favoriteId: string; isFavorite: boolean }): Promise<AxiosResponse> {
    return Axios.put(getBaseUrl(id, 'favorites'), data)
  }
}
