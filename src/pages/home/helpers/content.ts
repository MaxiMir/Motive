import { setSearchParams } from '@lib/helpers/url'
import { MainCharacteristicName, SecondCharacteristicName } from '@entities/characteristic'
import { Route } from '@shared/config/routes'

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
