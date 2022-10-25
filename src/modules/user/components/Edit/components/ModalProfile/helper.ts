import produce from 'immer'
import { UserBaseDto, UserPageDto } from 'src/common/dto'

export const getNextState = (page: UserPageDto, user: UserBaseDto): UserPageDto =>
  produce(page, (draft) => {
    draft.content.name = user.name
    draft.content.nickname = user.nickname
    draft.content.avatar = user.avatar
  })
