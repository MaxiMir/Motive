import dynamic from 'next/dynamic'
import {
  CharacteristicColor,
  useCharacteristicColor,
} from 'hook/useCharacteristicColor'
import { Characteristic, User } from 'dto'

const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardRating = dynamic(() => import('./UserCardRating'))

type UserCardBaseProps = User & {
  index: number // Rating
  type?: Characteristic // Rating
  view: 'favorite' | 'rating'
}
export type UserCardProps = UserCardBaseProps & {
  colors: CharacteristicColor
}

const UserCard = (props: UserCardBaseProps) => {
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
