import { Filter, getFilterParams } from 'shared/api/filter'
import { fetcher } from '../fetcher'
import { UserDto } from '../user'

export function getDayPoints(filter: Filter): Promise<UserDto[]> {
  const params = getFilterParams(filter)

  return fetcher.get('/day-points', { params })
}
