import { fetcher } from '../fetcher'

export function updateCompleted(id: number): Promise<void> {
  return fetcher.patch(`/tasks/${id}/completed`)
}
