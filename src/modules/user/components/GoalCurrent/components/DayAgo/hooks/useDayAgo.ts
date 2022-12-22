import { differenceInDays } from 'date-fns'
import { getMidnight } from '@lib/date'
import useFormatRelativeTime from '@hooks/useFormatRelativeTime'
import useFormatDistance from '@hooks/useFormatDistance'

export const useDayAgo = (day: string) => {
  const formatRelativeTime = useFormatRelativeTime()
  const formatDistance = useFormatDistance()
  const difference = differenceInDays(Date.parse(day), getMidnight())
  const [{ value }] = formatRelativeTime(difference, 'day', { style: 'short', numeric: 'auto' })

  return Math.abs(Number(value)) <= 1 ? value : formatDistance(day, getMidnight())
}