import { fetcher } from '@shared/api/fetcher'

export const updateRead = (id: number): Promise<void> => {
  return fetcher.patch(`/notifications/${id}/read`)
}
