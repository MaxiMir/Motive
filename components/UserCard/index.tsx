import dynamic from 'next/dynamic'
import { UserCardDetailProps } from './templates/UserCardDetail'
import { UserCardFavoriteProps } from './templates/UserCardFavorite'
import { UserCardRatingProps } from './templates/UserCardRating'
import { UserCardAvatarProps } from './templates/UserCardAvatar'

const Detail = dynamic(() => import('./templates/UserCardDetail'))
const Favorite = dynamic(() => import('./templates/UserCardFavorite'))
const Rating = dynamic(() => import('./templates/UserCardRating'))
const Avatar = dynamic(() => import('./templates/UserCardAvatar'))

export default function UserCard(
  props: UserCardDetailProps | UserCardFavoriteProps | UserCardRatingProps | UserCardAvatarProps,
): JSX.Element {
  switch (props.type) {
    case 'detail':
      return <Detail {...props} />
    case 'favorite':
      return <Favorite {...props} />
    case 'rating':
      return <Rating {...props} />
    case 'avatar':
      return <Avatar {...props} />
    default:
      return <></>
  }
}
