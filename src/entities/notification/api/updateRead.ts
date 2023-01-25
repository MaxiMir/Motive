import { fetcher } from '@shared/config'

export const updateRead = (id: number): Promise<void> => {
  return fetcher.patch(`/notifications/${id}/read`)
}
