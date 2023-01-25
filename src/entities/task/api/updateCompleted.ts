import fetcher from '@shared/config/fetcher'

export const updateCompleted = (id: number): Promise<void> => {
  return fetcher.patch(`/tasks/${id}/completed`)
}
