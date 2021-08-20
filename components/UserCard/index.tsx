import dynamic from 'next/dynamic'
import { Characteristic, User, UserDetail } from 'dto'

const UserCardDetail = dynamic(() => import('./UserCardDetail'))
const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardRating = dynamic(() => import('./UserCardRating'))

export interface UserCardDetailProps extends UserDetail {
  type: 'detail'
}

export interface UserCardFavoriteProps extends User {
  type: 'favorite'
}

export interface UserCardRatingProps extends User {
  type: 'rating'
  index: number
  characteristic: Characteristic
}

export default function UserCard(
  props: UserCardDetailProps | UserCardFavoriteProps | UserCardRatingProps,
): JSX.Element {
  switch (props.type) {
    case 'detail':
      return <UserCardDetail {...props} />
    case 'favorite':
      return <UserCardFavorite {...props} />
    case 'rating':
      return <UserCardRating {...props} />
    default:
      return <></>
  }
}
