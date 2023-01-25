import { UserBaseDto } from '@shared/api/user'
import { fetcher } from '@shared/config'
import { Filter, getFilterParams } from '@shared/lib/helpers'

export const getUsers = (filter: Filter): Promise<UserBaseDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/users', { params })
}
