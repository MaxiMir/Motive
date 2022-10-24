import { MainCharacteristicName, SecondCharacteristicName } from 'dto'
import { RATING } from 'route'
import { setQueryParams } from 'helpers/url'

interface AdvantageItem {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

const ADVANTAGES: AdvantageItem[] = [
  {
    name: MainCharacteristicName.Motivation,
    href: setQueryParams(RATING, { tab: '0' }),
  },
  {
    name: MainCharacteristicName.Creativity,
    href: setQueryParams(RATING, { tab: '1' }),
  },
  {
    name: MainCharacteristicName.Support,
    href: setQueryParams(RATING, { tab: '2' }),
  },
  {
    name: SecondCharacteristicName.Completed,
    href: RATING,
  },
]

export default ADVANTAGES
