import produce from 'immer'
import { ParsedUrlQuery } from 'querystring'
import { differenceInCalendarDays, format } from 'date-fns'
import { HashMark, SearchParam } from '@href'
import { CalendarDto, DayDto, GoalDto, MemberDto, OwnershipDto, TaskDto } from '@dto'
import { getMember } from '@modules/user/helper'

const SHOW_WEB_AFTER_DAYS = Number(process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS || '')

export const getDayDifference = (date: string) => {
  return differenceInCalendarDays(new Date(), Date.parse(date))
}

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
  query[SearchParam.ScrollTo] === HashMark.Discussion && query[SearchParam.ScrollId] === id.toString()

interface GoalInfo {
  daysGoneForOwner: number
  runningDays: number
  web: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
  canEdit: boolean
}

export const getGoalInfo = (goal: GoalDto, clientOwnership: OwnershipDto, userMember?: MemberDto): GoalInfo => {
  const { started, day, calendar, completed } = goal
  const today = new Date()
  const lastDay = !calendar || calendar[calendar.length - 1].date === day.date
  const controls = checkOnControls()
  const completeStage = clientOwnership.goal && controls && goal.stage <= goal.day.stage
  const daysGoneForOwner = getDayDifference(day.date)
  const runningDays = differenceInCalendarDays(Date.parse(day.date), Date.parse(started)) + 1
  const daysGone = getDaysGone()
  const web = checkOnWeb()
  const forTomorrow = checkOnForTomorrow()
  const canEdit = checkCanEdit()

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

  function checkOnForTomorrow() {
    if (!clientOwnership.member) {
      return daysGone === -1
    }

    return !!differenceInCalendarDays(Date.parse(clientOwnership.member.updated), today)
  }

  function checkCanEdit() {
    if (clientOwnership.page && clientOwnership.member) {
      return clientOwnership.member.dayId === day.id
    }

    return clientOwnership.goal
  }

  return {
    daysGoneForOwner,
    runningDays,
    web,
    controls,
    completeStage,
    forTomorrow,
    canEdit,
  }
}

export const redefineTasks = (tasks: TaskDto[], userMember?: MemberDto): TaskDto[] =>
  tasks.map((task) =>
    produce(task, (draft) => {
      if (!userMember) return

      draft.completed = userMember.completedTasks.includes(draft.id)
    }),
  )

export const getDayKey = (date: Date | string) => format(date instanceof Date ? date : new Date(date), 'yyyy-MM-dd')

export const getDateMap = (calendar: CalendarDto[] | undefined, day: DayDto) => {
  if (!calendar) {
    return { [getDayKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, c) => ({ ...acc, [getDayKey(c.date)]: c.id }), {})
}

type GetToggleDates = (dates: string[], dayKey: string) => [prev: string, next: string]

export const getToggleDates: GetToggleDates = (dates, dayKey) => {
  const valueIndex = dates.findIndex((d) => d === dayKey)
  const prev = dates[valueIndex - 1]
  const next = dates[valueIndex + 1]

  return [prev, next]
}
