import { useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Client, Role, Topic as TopicDTO, UserBase } from 'dto'
import DayService from 'services/DayService'
import usePartialMutate from 'hooks/usePartialMutate'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const UserCard = dynamic(() => import('components/UserCard'))
const AppList = dynamic<AppListProps<TopicDTO>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface DiscussionProps {
  dayId: string
  role: Role
  owner: UserBase
  client: Client
  count: number
}

const MESSAGE_COUNT = 10

export default function Discussion({ dayId, role, owner, client, count: initialCount }: DiscussionProps): JSX.Element {
  const swrKey = `discussion-${dayId}`
  const [count, setCount] = useState(initialCount)
  const { data } = useSWR(swrKey, () => (!count ? null : DayService.getDiscussion({ dayId })))
  const mutate = usePartialMutate(swrKey)
  const withInput = !!client.user && client.id !== owner.id
  const shownCount = count >= MESSAGE_COUNT ? MESSAGE_COUNT : count
  const minHeight = getMinHeight()

  const onAdd = async (topic: TopicDTO) => {
    setCount(count + 1)
    mutate([topic, ...(data || [])], false)
  }

  function getMinHeight() {
    const inputHeight = !withInput ? 0 : 72
    const elementsHeight = !shownCount ? 40 : shownCount * 84 + (shownCount - 1) * 16

    return inputHeight + elementsHeight
  }

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} minHeight={minHeight}>
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
                render={(topic) => <Topic dayId={dayId} topic={topic} role={role} owner={owner} />}
              />
            )}
          </>
        )}
      </>
    </AppBox>
  )
}
