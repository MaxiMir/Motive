import { MainCharacteristicName, SecondCharacteristicName } from '@modules/characteristic'
import { setSearchParams } from '@helpers/url'
import { Route } from '@href'

export const ADVANTAGES = [
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
