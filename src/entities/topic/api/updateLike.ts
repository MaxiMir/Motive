import fetcher from '@shared/api/fetcher'
import { getFilterParams } from '@lib/helpers/url'

export const updateLike = (id: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
}
