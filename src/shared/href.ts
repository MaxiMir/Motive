import { setSearchParams } from '@helpers/url'
import { Locale } from '@hooks/useSetLocale'

export const enum Route {
  TopOfTheDay = '/top-of-the-day',
  Search = '/search',
  Rating = '/rating',
  Following = '/following',
}

export const enum SearchParam {
  Dates = 'd',
  ScrollTo = 's',
  ScrollId = 'i',
}

export const enum HashMark {
  Goal = 'goal',
  Feedback = 'feedback',
  Discussion = 'discussion',
}

export const getImageSrc = (src: string): string => {
  return src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src
}

export const getUserHref = (nickname: string): string => `/${nickname}`

export const getGoalHref = (userHref: string, goalId: number): string => {
  const hashMark = getGoalHash(goalId)

  return userHref + hashMark
}

export const getGoalDayHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalHref(url, goalId)
}

export const getDiscussionHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setSearchParams(userHref, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hash = getDiscussionHash(goalId)

  return url + hash
}

export const getFeedbackHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hash = getDiscussionHash(goalId)

  return url + hash
}

const getGoalHash = (id: number): string => `#${HashMark.Goal}-${id}`

const getDiscussionHash = (id: number): string => `#${HashMark.Discussion}-${id}`

export const getHashtagHref = (q: string): string => {
  return setSearchParams(Route.Search, { q, type: 'tag' })
}

const getLocaleHref = (asPath: string, locale?: Locale) => {
  const localePath = !locale ? '' : `/${locale}`

  return [process.env.NEXT_PUBLIC_APP_URL, localePath, asPath].join('')
}

export const getLocaleHrefList = (asPath: string): Record<string, string> => ({
  [Locale.En]: getLocaleHref(asPath),
  [Locale.Ru]: getLocaleHref(asPath, Locale.Ru),
  [Locale.Uk]: getLocaleHref(asPath, Locale.Uk),
})
