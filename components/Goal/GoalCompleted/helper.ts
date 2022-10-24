import { ClientDto, ConfirmationDto, GoalBaseDto, MemberDto, PhotoDto } from 'dto'
import { differenceInCalendarDays, format } from 'date-fns'
import { getMember } from 'pages/[id]/components/UserView/helper'

export const checkOnRepeat = (
  userId: number,
  clientMembership: MemberDto[],
  goal: GoalBaseDto,
  client?: ClientDto,
): boolean => {
  if (!client) {
    return false
  }

  const isOwner = goal.owner.id === client.id
  const clientPage = userId === client.id
  const isMember = getMember(goal.id, clientMembership, client?.id)

  return ![clientPage, isOwner, isMember].some(Boolean)
}

interface GoalInfo {
  duration: string
  mainPhoto?: PhotoDto
  secondPhotos?: PhotoDto[]
  interval: string
}

export const getGoalInfo = (confirmation: ConfirmationDto): GoalInfo => {
  const start = Date.parse(confirmation.started)
  const end = Date.parse(confirmation.end)
  const daysDifference = differenceInCalendarDays(end, start)
  const duration = daysDifference === 1 ? '1 day' : `${daysDifference || 1} days`
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
