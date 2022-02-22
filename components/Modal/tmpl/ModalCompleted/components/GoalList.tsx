import { GoalDto } from 'dto'
import AppList from 'components/UI/AppList'

interface UserListProps {
  goals: GoalDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
}

export default function GoalList({ goals, checkOnLoadMore, onLoadMore }: UserListProps): JSX.Element {
  return (
    <AppList
      elements={goals}
      spacing={2}
      keyGetter={(goal) => goal.id}
      render={(goal, index) => <div key={index}>{goal.name}</div>}
    />
  )
}
