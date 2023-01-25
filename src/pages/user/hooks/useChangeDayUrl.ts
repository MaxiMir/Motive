import { useRouter } from 'next/router'
import { SearchParam } from '@entities/user'
import { GoalDto } from '@shared/api/goal'
import { setSearchParams } from '@shared/lib/helpers'

export const useChangeDayUrl = () => {
  const { asPath, push } = useRouter()

  return (goals: GoalDto[], goalId: number, dayId: number) => {
    const datesParam = goals
      .map(({ id, day }) => `${id}:${id !== goalId ? day.id : dayId}`)
      .join(',')
    const as = setSearchParams(asPath, { [SearchParam.Dates]: datesParam })
    push(as, as, { shallow: true })
  }
}
