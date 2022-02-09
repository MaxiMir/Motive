import produce from 'immer'
import { SubscriptionPageDto, UserDto } from 'dto'
import SubscriptionService from 'services/SubscriptionService'

export type Options = { user: UserDto; index: number; add: boolean }
export type Context = { previous?: SubscriptionPageDto }

export const fetcher = ({ user, add }: Options): Promise<void> => SubscriptionService.updateFollowing(user.id, add)

export const getNextState = (
  previous: SubscriptionPageDto,
  user: UserDto,
  index: number,
  add: boolean,
): SubscriptionPageDto =>
  produce(previous, (draft) => {
    if (add) {
      draft.content.splice(index, 0, user)
      return
    }

    draft.content = draft.content.filter((u) => u.id !== user.id)
  })
