import { Route } from '@href'
import { MainCharacteristicName, SecondCharacteristicName } from '@features/characteristic'
import { setSearchParams } from '@helpers/url'

const ADVANTAGES = [
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
] as const

export default ADVANTAGES
