import { MainCharacteristicName, SecondCharacteristicName } from 'dto'
import { RATING } from 'route'
import { setQueryParams } from 'helpers/url'
import { AdvantageProps } from './components/Advantage'

type AdvantageItem = Pick<AdvantageProps, 'id' | 'href'>

const ADVANTAGES: AdvantageItem[] = [
  {
    id: MainCharacteristicName.Motivation,
    href: RATING,
  },
  {
    id: MainCharacteristicName.Creativity,
    href: setQueryParams(RATING, { tab: '1' }),
  },
  {
    id: MainCharacteristicName.Support,
    href: setQueryParams(RATING, { tab: '2' }),
  },
  {
    id: SecondCharacteristicName.Completed,
    href: RATING,
  },
]

export default ADVANTAGES
