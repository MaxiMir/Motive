import { fetcher } from '@shared/api/fetcher'

export const updateCompleted = (id: number): Promise<void> => {
  return fetcher.patch(`/tasks/${id}/completed`)
}
