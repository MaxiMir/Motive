import dynamic from 'next/dynamic'
import { UserCardDetailProps } from './views/UserCardDetail'
import { UserCardFavoriteProps } from './views/UserCardFavorite'
import { UserCardRatingProps } from './views/UserCardRating'
import { UserCardAvatarProps } from './views/UserCardAvatar'
import { UserCardMessageProps } from './views/UserCardMessage'

const UserCardDetail = dynamic(() => import('./views/UserCardDetail'))
const UserCardFavorite = dynamic(() => import('./views/UserCardFavorite'))
const UserCardRating = dynamic(() => import('./views/UserCardRating'))
const UserCardAvatar = dynamic(() => import('./views/UserCardAvatar'))
const UserCardMessage = dynamic(() => import('./views/UserCardMessage'))

export default function UserCard(
  props: UserCardDetailProps | UserCardFavoriteProps | UserCardRatingProps | UserCardAvatarProps | UserCardMessageProps,
): JSX.Element {
  switch (props.type) {
    case 'detail':
      return <UserCardDetail {...props} />
    case 'favorite':
      return <UserCardFavorite {...props} />
    case 'rating':
      return <UserCardRating {...props} />
    case 'avatar':
      return <UserCardAvatar {...props} />
    case 'message':
      return <UserCardMessage {...props} />
    default:
      return <></>
  }
}
