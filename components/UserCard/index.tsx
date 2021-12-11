import dynamic from 'next/dynamic'
import { UserCardDetailProps } from './tmpl/UserCardDetail'
import { UserCardFavoriteProps } from './tmpl/UserCardFavorite'
import { UserCardRatingProps } from './tmpl/UserCardRating'
import { UserCardAvatarProps } from './tmpl/UserCardAvatar'
import { UserCardInputProps } from './tmpl/UserCardInput'

const UserCardDetail = dynamic(() => import('./tmpl/UserCardDetail'))
const UserCardFavorite = dynamic(() => import('./tmpl/UserCardFavorite'))
const UserCardRating = dynamic(() => import('./tmpl/UserCardRating'))
const UserCardAvatar = dynamic(() => import('./tmpl/UserCardAvatar'))
const UserCardInput = dynamic(() => import('./tmpl/UserCardInput'))

export default function UserCard(
  props: UserCardDetailProps | UserCardFavoriteProps | UserCardRatingProps | UserCardAvatarProps | UserCardInputProps,
): JSX.Element {
  switch (props.tmpl) {
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
