import { GoalCompletedDto, PhotoDto } from 'dto'
import { differenceInCalendarDays } from 'date-fns'

type GoalInfo = { duration: string; mainPhoto?: PhotoDto; secondPhotos?: PhotoDto[] }

export const getGoalInfo = (goal: GoalCompletedDto): GoalInfo => {
  const { confirmation } = goal
  const daysDifference = differenceInCalendarDays(Date.parse(goal.confirmation.date), Date.parse(goal.started))
  const duration = daysDifference === 1 ? '1 day' : `${daysDifference} days`
  const [mainPhoto, ...secondPhotos] = confirmation.photos || []

  return {
    duration,
    mainPhoto,
    secondPhotos,
  }
}
