import { useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR, { useSWRConfig } from 'swr'
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
  role: Role
  owner: UserBase
  client: Client
  dayId: string
  count: number
}

const MESSAGE_COUNT = 10

export default function Discussion({ role, owner, client, dayId, count: initial }: DiscussionProps): JSX.Element {
  const { mutate } = useSWRConfig()
  const { data } = useSWR(`discussion-${dayId}`, () => DayService.getDiscussion({ dayId }))
  const [count, setCount] = useState(initial)
  const withInput = !!client.user && client.id !== owner.id
  const shownCount = count >= MESSAGE_COUNT ? MESSAGE_COUNT : count

  const onAdd = async (topic: TopicWithQuestion) => {
    setCount(count + 1)
    mutate(`discussion-${dayId}`, [topic, ...(data || [])], false)
  }

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} minHeight={shownCount * 84 + (shownCount - 1) * 16 || 24}>
      <>
        {(!count || data) && withInput && (
          <UserCard type="input" dayId={dayId} user={client.user as UserBase} onAdd={onAdd} />
        )}
        {!count ? (
          <AppTypography>Nothing so far...</AppTypography>
        ) : (
          <>
            {!data ? (
              <Loader count={shownCount} withInput={withInput} />
            ) : (
              <AppList
                elements={data}
                keyGetter={(topic) => topic.id}
                spacing={2}
                render={(topic) => <Topic topic={topic} role={role} owner={owner} dayId={dayId} />}
              />
            )}
          </>
        )}
      </>
    </AppBox>
  )
}
