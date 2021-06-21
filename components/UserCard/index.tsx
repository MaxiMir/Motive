import dynamic from 'next/dynamic'
import {
  CharacteristicColor,
  useCharacteristicColor,
} from 'hook/useCharacteristicColor'
import { Characteristic, User } from 'dto'

const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardRating = dynamic(() => import('./UserCardRating'))

export type UserCardView = 'favorite' | 'rating'

interface UserBaseProps extends User {
  type?: Characteristic
  view: UserCardView
}

export interface UserProps extends UserBaseProps {
  colors: CharacteristicColor
}

const UserCard = (props: UserBaseProps) => {
  const colors = useCharacteristicColor()
  const Component = getComponent()

  function getComponent() {
    switch (props.view) {
      case 'favorite':
        return UserCardFavorite
      case 'rating':
        return UserCardRating
    }
  }

  return <Component {...props} colors={colors} />
}

export default UserCard
