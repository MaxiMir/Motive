import dynamic from 'next/dynamic'
import { UserCardRatingProps } from './tmpl/UserCardRating'
import { UserCardAvatarProps } from './tmpl/UserCardAvatar'
import { UserCardInputProps } from './tmpl/UserCardInput'
import { UserCardCharacteristicProps } from './tmpl/UserCardCharacteristic'

const UserCardRating = dynamic(() => import('./tmpl/UserCardRating'))
const UserCardAvatar = dynamic(() => import('./tmpl/UserCardAvatar'))
const UserCardInput = dynamic(() => import('./tmpl/UserCardInput'))
const UserCardCharacteristic = dynamic(() => import('./tmpl/UserCardCharacteristic'))

export default function UserCard(
  props: UserCardRatingProps | UserCardAvatarProps | UserCardInputProps | UserCardCharacteristicProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'rating':
      return <UserCardRating {...props} />
    case 'avatar':
      return <UserCardAvatar {...props} />
    case 'input':
      return <UserCardInput {...props} />
    case 'characteristic':
      return <UserCardCharacteristic {...props} />
  }
}
