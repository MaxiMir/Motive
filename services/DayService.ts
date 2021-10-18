import { Goal } from 'dto'
import Axios from 'lib/axios'

export default class DayService {
  // /days/{id}/{characteristic}
  static setCharacteristic(data: { dayId: string; characteristic: string; active: boolean }): Promise<Goal> {
    const { dayId, characteristic, ...restData } = data
    return Axios.put(`/days/${dayId}/${characteristic}`, restData)
  }
}
