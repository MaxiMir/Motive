import Axios from 'lib/axios'
import { FavoritesPage, MainPage, RatingPage } from 'dto'
import route from 'route'

export default class PageService {
  static async getMain(): Promise<MainPage> {
    return Axios.get('/')
  }

  static async getRating(): Promise<RatingPage> {
    return Axios.get(route.RATING)
  }

  static async getFavorites(): Promise<FavoritesPage> {
    return Axios.get(route.FAVORITES)
  }

  static async getDynamic<T>(url: string): Promise<T> {
    return Axios.get(url)
  }
}
