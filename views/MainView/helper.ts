import { MainCharacteristic, SecondCharacteristic } from 'dto'
import { RATING } from 'route'
import { setQueryParams } from 'helpers/url'
import { AdvantageProps } from './components/Advantage'

type AdvantageItem = Pick<AdvantageProps, 'id' | 'href'>

const ADVANTAGES: AdvantageItem[] = [
  {
    id: MainCharacteristic.MOTIVATION,
    href: RATING,
  },
  {
    id: MainCharacteristic.CREATIVITY,
    href: setQueryParams(RATING, { tab: '1' }),
  },
  {
    id: MainCharacteristic.SUPPORT,
    href: setQueryParams(RATING, { tab: '2' }),
  },
  {
    id: SecondCharacteristic.COMPLETED,
    href: RATING,
  },
]

export default ADVANTAGES
