import { ParsedUrlQuery } from 'querystring'
import { differenceInCalendarDays } from 'date-fns'
import { GoalDto, MemberDto, OwnershipDto } from 'dto'
import { HASH_MARK, SEARCH_PARAM } from 'helpers/url'
import { getMember } from 'views/UserView/helper'

const SHOW_WEB_AFTER_DAYS = +(process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS as string)

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

export const checkOnShowDiscussion = (query: ParsedUrlQuery, id: number): boolean =>
  query[SEARCH_PARAM.SCROLL_TO] === HASH_MARK.DISCUSSION && query[SEARCH_PARAM.SCROLL_ID] === id.toString()

export type GoalInfo = {
  daysGone: number
  daysGoneForOwner: number
  runningDays: number
  web: boolean
  form: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
}

export const getGoalInfo = (goal: GoalDto, clientOwnership: OwnershipDto, userMember?: MemberDto): GoalInfo => {
  const { started, day, calendar, completed } = goal
  const today = new Date()
  const lastDay = !calendar || calendar[calendar.length - 1].date === day.date
  const controls = checkOnControls()
  const completeStage = clientOwnership.goal && controls && goal.stage <= goal.day.stage
  const daysGoneForOwner = differenceInCalendarDays(today, Date.parse(day.date))
  const runningDays = differenceInCalendarDays(Date.parse(day.date), Date.parse(started)) + 1
  const daysGone = getDaysGone()
  const web = checkOnWeb()
  const form = checkOnForm()
  const forTomorrow = checkOnForTomorrow()

  function checkOnControls() {
    if (completed && clientOwnership.goal) {
      return false
    }

    return !clientOwnership.goal || lastDay
  }

  function getDaysGone() {
    if (!userMember) {
      return daysGoneForOwner
    }

    return differenceInCalendarDays(today, Date.parse(userMember.updated))
  }

  function checkOnWeb() {
    if (userMember) {
      return userMember.dayId === day.id && daysGone >= SHOW_WEB_AFTER_DAYS
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

    return !!differenceInCalendarDays(Date.parse(clientOwnership.member.updated), today)
  }

  return {
    daysGone,
    daysGoneForOwner,
    runningDays,
    web,
    form,
    controls,
    completeStage,
    forTomorrow,
  }
}
