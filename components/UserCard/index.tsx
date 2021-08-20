import dynamic from 'next/dynamic'
import { UserCardDetailProps } from './UserCardDetail'
import { UserCardFavoriteProps } from './UserCardFavorite'
import { UserCardRatingProps } from './UserCardRating'

const UserCardDetail = dynamic(() => import('./UserCardDetail'))
const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardRating = dynamic(() => import('./UserCardRating'))

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
