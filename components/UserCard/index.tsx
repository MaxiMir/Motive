import { FC } from 'react'
import dynamic from 'next/dynamic'

const UserCardCompact = dynamic(() => import('./UserCardCompact'))

interface UserCardProps {
  view: 'compact'
}

export const UserCard: FC<UserCardProps> = ({ view, ...restProps }) => {
  switch (view) {
    case 'compact':
      return <UserCardCompact {...restProps} />
    default:
      return <></>
  }
}
