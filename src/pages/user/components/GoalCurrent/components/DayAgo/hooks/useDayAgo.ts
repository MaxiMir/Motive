import { differenceInDays } from 'date-fns'
import { getMidnight } from '@lib/utils/date'
import { ucFirst } from '@lib/helpers/string'
import useFormatRelativeTime from '@lib/hooks/useFormatRelativeTime'
import useFormatDistance from '@lib/hooks/useFormatDistance'

export const useDayAgo = (day: string) => {
  const formatRelativeTime = useFormatRelativeTime()
  const formatDistance = useFormatDistance()
  const difference = differenceInDays(Date.parse(day), getMidnight())
  const [{ value }] = formatRelativeTime(difference, 'day', { style: 'short', numeric: 'auto' })

  return !Number(value) ? ucFirst(value) : formatDistance(day, getMidnight())
}
