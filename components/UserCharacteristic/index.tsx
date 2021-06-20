import { FC } from 'react'
import dynamic from 'next/dynamic'
import { CharacteristicType } from 'dto'

const UserCharacteristicCompact = dynamic(
  () => import('./UserCharacteristicCompact'),
)

export type View = 'compact'

export interface UserCharacteristicProps {
  type: CharacteristicType
  value: number
  color: string
  view: View
}

const UserCharacteristic: FC<UserCharacteristicProps> = (props) => {
  switch (props.view) {
    case 'compact':
      return <UserCharacteristicCompact {...props} />
    default:
      return <></>
  }
}

export default UserCharacteristic
