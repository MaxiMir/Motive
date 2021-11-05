import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Role, UserBase } from 'dto'
import DayService from 'services/DayService'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'
import Loader from './components/Loader'

const Topic = dynamic(() => import('./components/Topic'))

interface DiscussionProps {
  dayId: string
  role: Role
  owner: UserBase
}

export default function Discussion({ dayId, role, owner }: DiscussionProps): JSX.Element {
  const { data } = useSWR(`discussion${dayId}`, () => DayService.getDiscussion({ dayId }))
  const { users, topics } = data?.data || {}
  const usersMap = useMemo(getUsersMap, [users])

  function getUsersMap() {
    return users?.reduce<Record<string, UserBase>>((acc, user) => ({ ...acc, [user.id]: user }), {})
  }

  return (
    <AppBox flexDirection="column" spacing={2} width="100%">
      {!topics || !usersMap ? (
        <AppList elements={['1', '2', '3']} keyGetter={(id) => id} spacing={2} render={() => <Loader />} />
      ) : (
        <>
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
          {role === 'MEMBER' && <div>INPUT QUESTION</div>}
        </>
      )}
    </AppBox>
  )
}
