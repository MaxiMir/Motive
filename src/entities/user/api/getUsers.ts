import fetcher from '@shared/config/fetcher'
import { Filter, getFilterParams } from '@shared/lib/helpers/url'
import { UserBaseDto } from '@shared/api/user'

export const getUsers = (filter: Filter): Promise<UserBaseDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/users', { params })
}
