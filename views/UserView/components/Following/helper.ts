import produce from 'immer'
import { UserPageDto } from 'dto'
import SubscriptionService from 'services/SubscriptionService'

export type Options = { id: number; add: boolean }
export type Context = { previous?: UserPageDto }

export const fetcher = ({ id, add }: Options): Promise<void> => SubscriptionService.updateFollowing(id, add)

export const getNextState = (previous: UserPageDto, add: boolean): UserPageDto =>
  produce(previous, (draft) => {
    draft.content.following = add
    draft.content.characteristic.followers += add ? 1 : -1
  })
