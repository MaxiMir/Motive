import { fetcher } from '@shared/config'

export const incrementDayViews = (id: number): Promise<void> => {
  return fetcher.patch(`/days/${id}/views`)
}
