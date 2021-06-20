import { FC } from 'react'
import dynamic from 'next/dynamic'
import { User } from 'dto'

const UserCardCompact = dynamic(() => import('./UserCardCompact'))

export type View = 'compact'
export type UserCardProps = User & { view: View }

const UserCard: FC<UserCardProps> = (props) => {
  switch (props.view) {
    case 'compact':
      return <UserCardCompact {...props} />
    default:
      return <></>
  }
}

export default UserCard
