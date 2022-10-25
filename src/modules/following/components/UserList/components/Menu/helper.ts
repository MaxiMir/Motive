import produce from 'immer'
import { SubscriptionPageDto, UserDto } from 'src/common/dto'
import { SubscriptionService } from 'src/common/services/subscription'

export interface Options {
  user: UserDto
  index: number
  add: boolean
}

export interface Context {
  previous?: SubscriptionPageDto
}

export const fetcher = ({ user, add }: Options): Promise<void> => SubscriptionService.update(user.id, add)

export const getNextState = (
  page: SubscriptionPageDto,
  user: UserDto,
  index: number,
  add: boolean,
): SubscriptionPageDto =>
  produce(page, (draft) => {
    if (add) {
      draft.content.splice(index, 0, user)
      return
    }

    draft.content = draft.content.filter((u) => u.id !== user.id)
  })
