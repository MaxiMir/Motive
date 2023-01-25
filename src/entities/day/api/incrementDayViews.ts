import fetcher from '@shared/config/fetcher'

export const incrementDayViews = (id: number): Promise<void> => {
  return fetcher.patch(`/days/${id}/views`)
}
