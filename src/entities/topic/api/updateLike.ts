import fetcher from '@shared/config/fetcher'
import { getFilterParams } from '@shared/lib/helpers/url'

export const updateLike = (id: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
}
