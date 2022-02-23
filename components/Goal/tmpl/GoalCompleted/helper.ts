import { GoalCompletedDto, PhotoDto } from 'dto'
import { differenceInCalendarDays, format } from 'date-fns'

type GoalInfo = { duration: string; mainPhoto?: PhotoDto; secondPhotos?: PhotoDto[]; interval: string }

export const getGoalInfo = (goal: GoalCompletedDto): GoalInfo => {
  const { confirmation } = goal
  const start = Date.parse(goal.started)
  const end = Date.parse(goal.confirmation.date)
  const daysDifference = differenceInCalendarDays(end, start)
  const duration = daysDifference === 1 ? '1 day' : `${daysDifference} days`
  const [mainPhoto, ...secondPhotos] = confirmation.photos || []
  const startFormatted = format(start, 'MM/dd/yyyy')
  const endFormatted = format(end, 'MM/dd/yyyy')
  const interval = `${startFormatted} - ${endFormatted}`

  return {
    duration,
    mainPhoto,
    secondPhotos,
    interval,
  }
}
