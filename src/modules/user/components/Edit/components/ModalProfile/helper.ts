import produce from 'immer'
import { UserBaseDto, UserPageDto } from '@dto'

export const getNextState = (page: UserPageDto, user: UserBaseDto): UserPageDto =>
  produce(page, (draft) => {
    draft.content.name = user.name
    draft.content.nickname = user.nickname
    draft.content.avatar = user.avatar
    draft.content.status = user.status
    draft.content.location = user.location
    draft.content.bio = user.bio
  })
