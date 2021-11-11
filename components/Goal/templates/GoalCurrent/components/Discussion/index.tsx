import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Client, Role, UserBase } from 'dto'
import DayService from 'services/DayService'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const UserCard = dynamic(() => import('components/UserCard'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface DiscussionProps {
  dayId: string
  role: Role
  owner: UserBase
  client: Client
}

export default function Discussion({ dayId, role, owner, client }: DiscussionProps): JSX.Element {
  const { data } = useSWR(`discussion-${dayId}`, () => DayService.getDiscussion({ dayId }))

  return (
    <AppBox flexDirection="column" spacing={2} flexGrow={1}>
      {!data?.data ? (
        <AppList elements={['1', '2', '3']} keyGetter={(id) => id} spacing={2} render={() => <Loader />} />
      ) : (
        <>
          {client.user && client.id !== owner.id && <UserCard type="input" user={client.user} />}
          <AppList
            elements={data.data}
            keyGetter={(topic) => topic.id}
            spacing={2}
            render={(topic) => <Topic topic={topic} role={role} owner={owner} />}
          />
          {!data?.data && <AppTypography>Nothing so far...</AppTypography>}
        </>
      )}
    </AppBox>
  )
}
