import { User } from 'dto'
import UserCard, { UserCardView } from './UserCard'
import AppList from 'components/UI/AppList'

interface UserCardListProps {
  list: User[]
  view: UserCardView
}

const UserCardList = ({ list, view }: UserCardListProps) => (
  <AppList<User>
    elements={list}
    spacing={4}
    render={(el) => <UserCard {...el} view={view} />}
  />
)

export default UserCardList
