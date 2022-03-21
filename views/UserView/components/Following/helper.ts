import produce from 'immer'
import { UserPageDto } from 'dto'
import FollowerService from 'services/FollowerService'

export type Options = { userId: number; add: boolean }
export type Context = { previous?: UserPageDto }

export const fetcher = ({ userId, add }: Options): Promise<void> => FollowerService.update(userId, add)

export const getNextState = (page: UserPageDto, add: boolean): UserPageDto =>
  produce(page, (draft) => {
    draft.content.following = add
    draft.content.characteristic.followers += add ? 1 : -1
  })
