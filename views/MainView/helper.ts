import { RATING } from 'route'
import { setQueryParams } from 'helpers/url'
import { AdvantageProps } from './components/Advantage'

type AdvantageItem = Pick<AdvantageProps, 'id' | 'href'>

const ADVANTAGES: AdvantageItem[] = [
  {
    id: 'motivation',
    href: RATING,
  },
  {
    id: 'creativity',
    href: setQueryParams(RATING, { tab: '1' }),
  },
  {
    id: 'support',
    href: setQueryParams(RATING, { tab: '2' }),
  },
  {
    id: 'completed',
    href: RATING,
  },
]

export default ADVANTAGES
