import fetcher from '@shared/config/fetcher'

export const updateRead = (id: number): Promise<void> => {
  return fetcher.patch(`/notifications/${id}/read`)
}
