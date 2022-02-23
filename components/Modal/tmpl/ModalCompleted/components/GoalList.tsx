import { GoalCompletedDto, UserBaseDto } from 'dto'
import AppList from 'components/UI/AppList'
import Goal from 'components/Goal'

interface UserListProps {
  goals: GoalCompletedDto[]
  client?: UserBaseDto
  checkOnLoadMore: (index: number) => boolean
  onView: () => void
}

export default function GoalList({ goals, client, checkOnLoadMore, onView }: UserListProps): JSX.Element {
  return (
    <AppList
      elements={goals}
      flexDirection="column"
      spacing={3}
      keyGetter={(goal) => goal.id}
      render={(goal, index) => (
        <Goal tmpl="completed" goal={goal} client={client} inView={checkOnLoadMore(index)} onView={onView} />
      )}
    />
  )
}
