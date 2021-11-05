import { RATING_ROUTE } from 'route'
import { setQueryParams } from 'helpers/url'
import { AdvantageProps } from './Advantage'

type AdvantageItem = Omit<AdvantageProps, 'color'>

export const ADVANTAGES: AdvantageItem[] = [
  {
    characteristic: 'motivation',
    title: 'Be motivational',
    subtitle: 'for yourself and others',
    href: RATING_ROUTE,
  },
  {
    characteristic: 'creativity',
    title: 'BE СREATIVE',
    subtitle: 'for yourself and others',
    href: setQueryParams(RATING_ROUTE, { tab: '1' }),
  },
  {
    characteristic: 'support',
    title: 'BE SUPPORTIVE',
    subtitle: 'to people in need',
    href: setQueryParams(RATING_ROUTE, { tab: '2' }),
  },
  {
    characteristic: 'completed',
    title: 'Rating',
    subtitle: 'And tear up the tops!',
    href: RATING_ROUTE,
  },
]
