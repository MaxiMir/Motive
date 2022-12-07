import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { SearchParam } from '@href'
import { GoalDto } from '@dto'
import { getCurrentSearchParams, setSearchParams } from '@helpers/url'

export const useChangeDayUrl = () => {
  const { locale } = useIntl()
  const { asPath, pathname, push } = useRouter()

  return (goals: GoalDto[], goalId: number, dayId: number) => {
    const { [SearchParam.Dates]: _, ...restParams } = getCurrentSearchParams()
    const datesParam = goals.map(({ id, day }) => `${id}:${id !== goalId ? day.id : dayId}`).join(',')
    const as = setSearchParams(asPath, {
      [SearchParam.Dates]: datesParam,
      ...restParams,
    })
    push(pathname, as, { shallow: true, locale })
  }
}
