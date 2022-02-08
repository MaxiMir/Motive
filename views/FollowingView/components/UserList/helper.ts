import { SubscriptionPageDto, UserDto } from 'dto'
import SubscriptionService from 'services/SubscriptionService'

export type Options = { user: UserDto; index: number; add: boolean }
export type Context = { previous?: SubscriptionPageDto }

export const fetcher = ({ user, add }: Options): Promise<void> =>
  SubscriptionService.updateFollowing({ id: user.id, add })
