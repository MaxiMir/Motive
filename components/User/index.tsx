import dynamic from 'next/dynamic'
import { UserRatingProps } from './tmpl/UserRating'
import { UserInputProps } from './tmpl/UserInput'
import { UserCharacteristicProps } from './tmpl/UserCharacteristic'
import { UserOwnerProps } from './tmpl/UserOwner'

const UserRating = dynamic(() => import('./tmpl/UserRating'))
const UserInput = dynamic(() => import('./tmpl/UserInput'))
const UserCharacteristic = dynamic(() => import('./tmpl/UserCharacteristic'))
const UserOwner = dynamic(() => import('./tmpl/UserOwner'))

export default function User(
  props: UserRatingProps | UserInputProps | UserCharacteristicProps | UserOwnerProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'rating':
      return <UserRating {...props} />
    case 'input':
      return <UserInput {...props} />
    case 'characteristic':
      return <UserCharacteristic {...props} />
    case 'owner':
      return <UserOwner {...props} />
  }
}
