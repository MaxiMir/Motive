import { useRouter } from 'next/router'
import { GoalDto } from 'dto'
import { SEARCH_PARAMS, getQueryParams, setQueryParams } from 'helpers/url'

export default function useChangeDayUrl(): (goals: GoalDto[], goalID: number, dayID: number) => void {
  const router = useRouter()

  return (goals: GoalDto[], goalID: number, dayID: number) => {
    const { [SEARCH_PARAMS.DATES]: _, ...restParams } = getQueryParams()
    const datesParam = goals.map(({ id, day }) => `${id}:${id !== goalID ? day.id : dayID}`).join(',')
    const as = setQueryParams(router.asPath, {
      [SEARCH_PARAMS.DATES]: datesParam,
      ...restParams,
    })

    router.push(router.pathname, as, { shallow: true })
  }
}
