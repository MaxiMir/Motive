import { differenceInDays } from 'date-fns'
import { getMidnight } from '@lib/date'
import useFormatRelativeTime from '@hooks/useFormatRelativeTime'
import useFormatDistance from '@hooks/useFormatDistance'
import { ucFirst } from '@helpers/string'

export const useDayAgo = (day: string) => {
  const formatRelativeTime = useFormatRelativeTime()
  const formatDistance = useFormatDistance()
  const difference = differenceInDays(Date.parse(day), getMidnight())
  const [{ value }] = formatRelativeTime(difference, 'day', { style: 'short', numeric: 'auto' })

  return !Number(value) ? ucFirst(value) : formatDistance(day, getMidnight())
}
