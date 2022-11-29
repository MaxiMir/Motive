import { MainCharacteristicName, SecondCharacteristicName } from '@dto'
import { Route } from '@href'
import { setSearchParams } from '@helpers/url'

interface AdvantageItem {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

const ADVANTAGES: AdvantageItem[] = [
  {
    name: MainCharacteristicName.Motivation,
    href: setSearchParams(Route.Rating, { tab: '0' }),
  },
  {
    name: MainCharacteristicName.Creativity,
    href: setSearchParams(Route.Rating, { tab: '1' }),
  },
  {
    name: MainCharacteristicName.Support,
    href: setSearchParams(Route.Rating, { tab: '2' }),
  },
  {
    name: SecondCharacteristicName.Completed,
    href: Route.Rating,
  },
]

export default ADVANTAGES
