import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Client, Role, UserBase } from 'dto'
import DayService from 'services/DayService'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const TopicInput = dynamic(() => import('./components/TopicInput'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface DiscussionProps {
  dayId: string
  role: Role
  owner: UserBase
  client: Client
}

export default function Discussion({ dayId, role, owner, client }: DiscussionProps): JSX.Element {
  const { data } = useSWR(`discussion-${dayId}`, () => DayService.getDiscussion({ dayId }))
  const { users, topics } = data?.data || {}
  const usersMap = useMemo(getUsersMap, [users])
  // TODO REMOVE USERS
  function getUsersMap() {
    return users?.reduce<Record<string, UserBase>>((acc, user) => ({ ...acc, [user.id]: user }), {})
  }

  return (
    <AppBox flexDirection="column" spacing={2} width="100%">
      {!topics || !usersMap ? (
        <AppList elements={['1', '2', '3']} keyGetter={(id) => id} spacing={2} render={() => <Loader />} />
      ) : (
        <>
          {client.user && client.id !== owner.id && <TopicInput user={client.user} />}
          <AppList
            elements={topics}
            keyGetter={(topic) => topic.id}
            spacing={2}
            render={(topic) => (
              <Topic
                topicUser={usersMap[topic.userId]}
                answerUser={!topic.answer?.userId ? undefined : usersMap[topic.answer.userId]}
                topic={topic}
                role={role}
                owner={owner}
              />
            )}
          />
          {!topics.length && <AppTypography>Nothing so far...</AppTypography>}
        </>
      )}
    </AppBox>
  )
}
