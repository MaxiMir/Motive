import { FC } from 'react'
import { User } from 'dto'
import UserCard, { View } from './UserCard'
import AppList from 'components/UI/AppList'

interface UserCardListProps {
  list: User[]
  view: View
}

const UserCardList: FC<UserCardListProps> = ({ list, view }) => (
  <AppList<User>
    elements={list}
    spacing={4}
    render={(el) => <UserCard {...el} view={view} />}
  />
)

export default UserCardList
