import dynamic from 'next/dynamic'
import { UserRatingProps } from './tmpl/UserRating'
import { UserAvatarProps } from './tmpl/UserAvatar'
import { UserInputProps } from './tmpl/UserInput'
import { UserCharacteristicProps } from './tmpl/UserCharacteristic'

const UserRating = dynamic(() => import('./tmpl/UserRating'))
const UserAvatar = dynamic(() => import('./tmpl/UserAvatar'))
const UserInput = dynamic(() => import('./tmpl/UserInput'))
const UserCharacteristic = dynamic(() => import('./tmpl/UserCharacteristic'))

export default function User(
  props: UserRatingProps | UserAvatarProps | UserInputProps | UserCharacteristicProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'rating':
      return <UserRating {...props} />
    case 'avatar':
      return <UserAvatar {...props} />
    case 'input':
      return <UserInput {...props} />
    case 'characteristic':
      return <UserCharacteristic {...props} />
  }
}
