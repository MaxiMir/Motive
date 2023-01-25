import { fetcher } from '@shared/config'
import { getFilterParams } from '@shared/lib/helpers'

export const updateLike = (id: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
}
