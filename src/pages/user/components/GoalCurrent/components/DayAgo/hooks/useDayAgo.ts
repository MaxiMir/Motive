import { differenceInDays } from 'date-fns'
import { ucFirst } from '@shared/lib/helpers'
import { useFormatDistance, useFormatRelativeTime } from '@shared/lib/hooks'
import { getMidnight } from '@shared/lib/utils'

export const useDayAgo = (day: string) => {
  const formatRelativeTime = useFormatRelativeTime()
  const formatDistance = useFormatDistance()
  const difference = differenceInDays(Date.parse(day), getMidnight())
  const [{ value }] = formatRelativeTime(difference, 'day', { style: 'short', numeric: 'auto' })

  return !Number(value) ? ucFirst(value) : formatDistance(day, getMidnight())
}
