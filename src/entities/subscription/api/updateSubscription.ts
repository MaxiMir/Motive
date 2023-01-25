import fetcher from '@shared/config/fetcher'
import { getFilterParams } from '@shared/lib/helpers/url'

export const updateSubscription = (userId: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch('/subscriptions', { userId }, { params })
}
