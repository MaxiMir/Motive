import { UserBaseDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'
import { Filter, getFilterParams } from '@shared/lib/helpers'

export const getUsers = (filter: Filter): Promise<UserBaseDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/users', { params })
}
