import fetcher from '@shared/api/fetcher'
import { Filter, getFilterParams } from '@lib/helpers/url'
import { UserBaseDto } from '@entities/user/model/dto'

export const getUsers = (filter: Filter): Promise<UserBaseDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/users', { params })
}
