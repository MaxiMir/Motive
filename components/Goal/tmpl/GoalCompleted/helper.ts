import { ClientDto, ConfirmationDto, GoalBaseDto, PhotoDto, UserDetailDto } from 'dto'
import { differenceInCalendarDays, format } from 'date-fns'
import { getMember } from 'views/UserView/helper'

export const checkOnRepeat = (user: UserDetailDto, goal: GoalBaseDto, client?: ClientDto): boolean => {
  const { id, clientMembership = [] } = user
  const isOwner = goal.owner.id === client?.id
  const clientPage = id === client?.id
  const isMember = getMember(goal.id, clientMembership, client?.id)

  return ![clientPage, isOwner, isMember].some(Boolean)
}

type GoalInfo = { duration: string; mainPhoto?: PhotoDto; secondPhotos?: PhotoDto[]; interval: string }

export const getGoalInfo = (confirmation: ConfirmationDto): GoalInfo => {
  const start = Date.parse(confirmation.started)
  const end = Date.parse(confirmation.end)
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
