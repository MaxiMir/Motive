import produce from 'immer'
import { UserPageDto } from 'src/common/dto'
import { SubscriptionService } from 'src/common/services/subscription'

export interface Options {
  userId: number
  add: boolean
}

export interface Context {
  previous?: UserPageDto
}

export const fetcher = ({ userId, add }: Options): Promise<void> => SubscriptionService.update(userId, add)

export const getNextState = (page: UserPageDto, add: boolean): UserPageDto =>
  produce(page, (draft) => {
    draft.content.following = add
    draft.content.characteristic.followers += add ? 1 : -1
  })
