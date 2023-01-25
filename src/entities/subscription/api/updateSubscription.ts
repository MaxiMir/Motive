import { fetcher } from '@shared/config'
import { getFilterParams } from '@shared/lib/helpers'

export const updateSubscription = (userId: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch('/subscriptions', { userId }, { params })
}
