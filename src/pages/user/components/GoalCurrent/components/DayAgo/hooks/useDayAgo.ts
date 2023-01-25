import { differenceInDays } from 'date-fns'
import { getMidnight } from '@shared/lib/utils/date'
import { ucFirst } from '@shared/lib/helpers/string'
import useFormatRelativeTime from '@shared/lib/hooks/useFormatRelativeTime'
import useFormatDistance from '@shared/lib/hooks/useFormatDistance'

export const useDayAgo = (day: string) => {
  const formatRelativeTime = useFormatRelativeTime()
  const formatDistance = useFormatDistance()
  const difference = differenceInDays(Date.parse(day), getMidnight())
  const [{ value }] = formatRelativeTime(difference, 'day', { style: 'short', numeric: 'auto' })

  return !Number(value) ? ucFirst(value) : formatDistance(day, getMidnight())
}
