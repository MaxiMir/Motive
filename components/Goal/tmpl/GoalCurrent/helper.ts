import { differenceInCalendarDays } from 'date-fns'
import { GoalDto, MemberDto, OwnershipDto } from 'dto'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import { getMember } from 'views/UserView/helper'

const SHOW_WEB_AFTER_DAYS = 14

export const getClientOwnership = (
  goal: GoalDto,
  clientId: number | undefined,
  clientPage: boolean,
  clientMembership: MemberDto[],
): OwnershipDto => {
  const { id, owner } = goal
  const clientGoal = owner.id === clientId
  const clientMember = getMember(id, clientMembership, clientId)

  return { page: clientPage, goal: clientGoal, member: clientMember }
}

export const getGoalHref = (userHref: string, goal: GoalDto): string => {
  const { id, day } = goal

  return setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goal.id, [SEARCH_PARAMS.DATES]: `${id}:${day.id}` })
}

export type GoalInfo = {
  daysGone: number
  daysGoneForOwner: number
  daysPassed: number
  web: boolean
  form: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
}

export const getGoalInfo = (goal: GoalDto, clientOwnership: OwnershipDto): GoalInfo => {
  const { started, day, calendar } = goal
  const today = new Date()
  const lastDay = !calendar || calendar[calendar.length - 1].date === day.date
  const controls = !clientOwnership.goal || lastDay
  const completeStage = clientOwnership.goal && controls && goal.stage <= goal.day.stage
  const daysGoneForOwner = differenceInCalendarDays(today, Date.parse(day.date))
  const daysPassed = differenceInCalendarDays(today, Date.parse(started))
  const daysGone = getDaysGone()
  const web = checkOnWeb()
  const form = checkOnForm()
  const forTomorrow = checkOnForTomorrow()

  function getDaysGone() {
    if (!clientOwnership.member) {
      return daysGoneForOwner
    }

    const date = clientOwnership.member.lastEndOfDay || clientOwnership.member.started

    return differenceInCalendarDays(today, Date.parse(date))
  }

  function checkOnWeb() {
    if (clientOwnership.member) {
      return clientOwnership.member.dayId === day.id && daysGone >= SHOW_WEB_AFTER_DAYS
    }

    return lastDay && daysGoneForOwner >= SHOW_WEB_AFTER_DAYS
  }

  function checkOnForm() {
    if (clientOwnership.page && clientOwnership.member) {
      return clientOwnership.member.dayId === day.id && daysGone <= 0
    }

    return clientOwnership.goal && daysGone <= 0
  }

  function checkOnForTomorrow() {
    if (!clientOwnership.member) {
      return daysGone === -1
    }

    if (!clientOwnership.member.lastEndOfDay) {
      return false
    }

    return !differenceInCalendarDays(Date.parse(clientOwnership.member.lastEndOfDay), today)
  }

  return {
    daysGone,
    daysGoneForOwner,
    daysPassed,
    web,
    form,
    controls,
    completeStage,
    forTomorrow,
  }
}
