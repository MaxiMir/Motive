import dynamic from 'next/dynamic'
import { UserCardDetailProps } from './templates/UserCardDetail'
import { UserCardFavoriteProps } from './templates/UserCardFavorite'
import { UserCardRatingProps } from './templates/UserCardRating'
import { UserCardAvatarProps } from './templates/UserCardAvatar'
import { UserCardInputProps } from './templates/UserCardInput'

const UserCardDetail = dynamic(() => import('./templates/UserCardDetail'))
const UserCardFavorite = dynamic(() => import('./templates/UserCardFavorite'))
const UserCardRating = dynamic(() => import('./templates/UserCardRating'))
const UserCardAvatar = dynamic(() => import('./templates/UserCardAvatar'))
const UserCardInput = dynamic(() => import('./templates/UserCardInput'))

export default function UserCard(
  props: UserCardDetailProps | UserCardFavoriteProps | UserCardRatingProps | UserCardAvatarProps | UserCardInputProps,
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
    case 'input':
      return <UserCardInput {...props} />
    default:
      return <></>
  }
}
