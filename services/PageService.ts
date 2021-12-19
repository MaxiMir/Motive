import Axios from 'lib/axios'
import { FavoritesPage, MainPage, RatingPage, UserPage } from 'dto'

export default class PageService {
  static async getMain(): Promise<MainPage> {
    return Axios.get('/pages/main')
  }

  static async getRating(): Promise<RatingPage> {
    return Axios.get('/rating')
  }

  static async getFavorites(): Promise<FavoritesPage> {
    return Axios.get('/pages/favorites')
  }

  static getUser(nicknameUrn: string): Promise<UserPage> {
    return Axios.get(`/pages/users${nicknameUrn}`, { validateStatus: () => true })
  }

  static async getURL<T>(url: string): Promise<T> {
    return Axios.get(url)
  }
}
