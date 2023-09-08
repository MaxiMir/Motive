import { Filter, getFilterParams } from 'shared/api/filter'
import { fetcher } from '../fetcher'
import { DayPoint } from './dto'

export function getDayPoints(filter: Filter): Promise<DayPoint[]> {
  const params = getFilterParams(filter)

  return fetcher.get('/day-points', { params })
}
