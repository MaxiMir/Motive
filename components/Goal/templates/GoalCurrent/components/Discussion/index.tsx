import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import useSWRInfinite from 'swr/infinite'
import { Client, Role, Topic as TopicDTO, UserBase } from 'dto'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'
import { getSWRKey, fetcher, checkPartialOnLoadMore } from './helper'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const UserCard = dynamic(() => import('components/UserCard'))
const AppList = dynamic<AppListProps<TopicDTO>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))
const AppInView = dynamic(() => import('components/UI/AppInView'))

interface DiscussionProps {
  dayId: string
  role: Role
  owner: UserBase
  client: Client
  count: number
}

const VISIBLE_COUNT = 4

export default function Discussion({ dayId, role, owner, client, count: initialCount }: DiscussionProps): JSX.Element {
  const [count, setCount] = useState(initialCount)
  const { data, size, setSize, mutate } = useSWRInfinite(getSWRKey(dayId, count), fetcher)
  const content = useMemo(
    () =>
      data
        ?.flat()
        .map((d) => d.content)
        .flat(),
    [data],
  )
  const withInput = !!client.user && client.id !== owner.id
  const shownCount = count >= VISIBLE_COUNT ? VISIBLE_COUNT : count
  const height = !count ? undefined : (!withInput ? 0 : 56) + 524
  const checkOnLoadMore = checkPartialOnLoadMore(data, content)

  const onAdd = async (topic: TopicDTO) => {
    setCount(count + 1)
    await mutate([{ content: [topic], last: false }, ...(data || [])], false)
  }

  const onLoadMore = (inView: boolean) => inView && setSize(size + 1)

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} height={height}>
      <>
        {(!count || content) && withInput && (
          <UserCard type="input" dayId={dayId} user={client.user as UserBase} onAdd={onAdd} />
        )}
        {!count ? (
          <AppTypography>Nothing so far...</AppTypography>
        ) : (
          <>
            {!content ? (
              <Loader count={shownCount} withInput={withInput} />
            ) : (
              <AppBox display="block" maxHeight={524} pr={2} overflow="auto">
                <AppList
                  elements={content}
                  keyGetter={(topic) => topic.id}
                  spacing={2}
                  render={(topic, index) => (
                    <>
                      <Topic dayId={dayId} topic={topic} role={role} owner={owner} />
                      {checkOnLoadMore(index) && <AppInView onChange={onLoadMore} />}
                    </>
                  )}
                />
              </AppBox>
            )}
          </>
        )}
      </>
    </AppBox>
  )
}
