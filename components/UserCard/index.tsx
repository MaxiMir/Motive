import dynamic from 'next/dynamic'
import { UserCardDetailProps } from './UserCardDetail'
import { UserCardFavoriteProps } from './UserCardFavorite'
import { UserCardRatingProps } from './UserCardRating'
import { UserCardMessageProps } from './UserCardMessage'

const UserCardDetail = dynamic(() => import('./UserCardDetail'))
const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardRating = dynamic(() => import('./UserCardRating'))
const UserCardMessage = dynamic(() => import('./UserCardMessage'))

export default function UserCard(
  props: UserCardDetailProps | UserCardFavoriteProps | UserCardRatingProps | UserCardMessageProps,
): JSX.Element {
  switch (props.type) {
    case 'detail':
      return <UserCardDetail {...props} />
    case 'favorite':
      return <UserCardFavorite {...props} />
    case 'rating':
      return <UserCardRating {...props} />
    case 'message':
      return <UserCardMessage {...props} />
    default:
      return <></>
  }
}
