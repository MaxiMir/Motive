import dynamic from 'next/dynamic'
import { DetailProps } from './templates/Detail'
import { FavoriteProps } from './templates/Favorite'
import { RatingProps } from './templates/Rating'
import { AvatarProps } from './templates/Avatar'

const Detail = dynamic(() => import('./templates/Detail'))
const Favorite = dynamic(() => import('./templates/Favorite'))
const Rating = dynamic(() => import('./templates/Rating'))
const Avatar = dynamic(() => import('./templates/Avatar'))

export default function UserCard(props: DetailProps | FavoriteProps | RatingProps | AvatarProps): JSX.Element {
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
