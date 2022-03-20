import dynamic from 'next/dynamic'
import { UserRatingProps } from './tmpl/UserRating'
import { UserInputProps } from './tmpl/UserInput'
import { UserCharacteristicProps } from './tmpl/UserCharacteristic'
import { UserAvatarProps } from './tmpl/UserAvatar'
import { UserSearchProps } from './tmpl/UserSearch'

const UserRating = dynamic(() => import('./tmpl/UserRating'))
const UserInput = dynamic(() => import('./tmpl/UserInput'))
const UserCharacteristic = dynamic(() => import('./tmpl/UserCharacteristic'))
const UserAvatar = dynamic(() => import('./tmpl/UserAvatar'))
const UserSearch = dynamic(() => import('./tmpl/UserSearch'))

export default function User(
  props: UserRatingProps | UserInputProps | UserCharacteristicProps | UserAvatarProps | UserSearchProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'rating':
      return <UserRating {...props} />
    case 'input':
      return <UserInput {...props} />
    case 'characteristic':
      return <UserCharacteristic {...props} />
    case 'avatar':
      return <UserAvatar {...props} />
    case 'search':
      return <UserSearch {...props} />
  }
}
