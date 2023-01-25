import fetcher from '@shared/api/fetcher'
import { getFilterParams } from '@lib/helpers/url'

export const updateSubscription = (userId: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch('/subscriptions', { userId }, { params })
}
