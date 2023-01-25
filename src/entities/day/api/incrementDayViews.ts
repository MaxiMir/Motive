import fetcher from '@shared/api/fetcher'

export const incrementDayViews = (id: number): Promise<void> => {
  return fetcher.patch(`/days/${id}/views`)
}
