import { MainCharacteristic, SecondCharacteristic } from 'dto'
import { RATING } from 'route'
import { setQueryParams } from 'helpers/url'
import { AdvantageProps } from './components/Advantage'

type AdvantageItem = Pick<AdvantageProps, 'id' | 'href'>

const ADVANTAGES: AdvantageItem[] = [
  {
    id: MainCharacteristic.Motivation,
    href: RATING,
  },
  {
    id: MainCharacteristic.Creativity,
    href: setQueryParams(RATING, { tab: '1' }),
  },
  {
    id: MainCharacteristic.Support,
    href: setQueryParams(RATING, { tab: '2' }),
  },
  {
    id: SecondCharacteristic.Completed,
    href: RATING,
  },
]

export default ADVANTAGES
