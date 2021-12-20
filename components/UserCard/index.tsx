import dynamic from 'next/dynamic'
import { UserCardFollowingProps } from './tmpl/UserCardFollowing'
import { UserCardRatingProps } from './tmpl/UserCardRating'
import { UserCardAvatarProps } from './tmpl/UserCardAvatar'
import { UserCardInputProps } from './tmpl/UserCardInput'

const UserCardFollowing = dynamic(() => import('./tmpl/UserCardFollowing'))
const UserCardRating = dynamic(() => import('./tmpl/UserCardRating'))
const UserCardAvatar = dynamic(() => import('./tmpl/UserCardAvatar'))
const UserCardInput = dynamic(() => import('./tmpl/UserCardInput'))

export default function UserCard(
  props: UserCardFollowingProps | UserCardRatingProps | UserCardAvatarProps | UserCardInputProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'following':
      return <UserCardFollowing {...props} />
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
