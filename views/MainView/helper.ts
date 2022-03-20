import { RATING } from 'route'
import { setQueryParams } from 'helpers/url'
import { AdvantageProps } from './components/Advantage'

type AdvantageItem = Omit<AdvantageProps, 'color'>

const ADVANTAGES: AdvantageItem[] = [
  {
    name: 'motivation',
    title: 'Be motivational',
    subtitle: 'for yourself and others',
    href: RATING,
  },
  {
    name: 'creativity',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
    href: setQueryParams(RATING, { tab: '1' }),
  },
  {
    name: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
    href: setQueryParams(RATING, { tab: '2' }),
  },
  {
    name: 'completed',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
    href: RATING,
  },
]

export default ADVANTAGES
