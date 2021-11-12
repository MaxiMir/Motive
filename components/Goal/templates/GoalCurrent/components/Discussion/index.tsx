import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Client, Role, TopicWithQuestion, TopicWithSupport, UserBase } from 'dto'
import DayService from 'services/DayService'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const UserCard = dynamic(() => import('components/UserCard'))
const AppList = dynamic<AppListProps<TopicWithQuestion | TopicWithSupport>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface DiscussionProps {
  dayId: string
  role: Role
  owner: UserBase
  client: Client
  count: number
}

export default function Discussion({ dayId, role, owner, client, count }: DiscussionProps): JSX.Element {
  const { data } = useSWR(`discussion-${dayId}`, () => DayService.getDiscussion({ dayId }))

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} minHeight={count * 84 + (count - 1) * 16 || 24}>
      <>
        {(!count || data?.data) && client.user && client.id !== owner.id && (
          <UserCard type="input" user={client.user} />
        )}
        {!count ? (
          <AppTypography>Nothing so far...</AppTypography>
        ) : (
          <>
            {!data?.data ? (
              <Loader count={count} />
            ) : (
              <AppList
                elements={data.data}
                keyGetter={(topic) => topic.id}
                spacing={2}
                render={(topic) => <Topic topic={topic} role={role} owner={owner} />}
              />
            )}
          </>
        )}
      </>
    </AppBox>
  )
}
