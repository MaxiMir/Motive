import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import useSWRInfinite from 'swr/infinite'
import { RoleDto, TopicDto, UserBaseDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'
import { getSWRKey, fetcher, checkPartialOnLoadMore } from './helper'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const User = dynamic(() => import('components/User'))
const AppList = dynamic<AppListProps<TopicDto>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface DiscussionProps {
  dayId: number
  role: RoleDto
  owner: UserBaseDto
  client: UserBaseDto
  count: number
  setDiscussionCount: (count: number) => void
}

const VISIBLE_COUNT = 4

export default function Discussion({
  dayId,
  role,
  owner,
  client,
  count,
  setDiscussionCount,
}: DiscussionProps): JSX.Element {
  const { data, size, setSize, mutate } = useSWRInfinite(getSWRKey(dayId.toString()), fetcher, {
    initialSize: !count ? 0 : 1,
  })
  const content = useMemo(getContent, [data])
  const withInput = !!client.id && client.id !== owner.id
  const shownCount = count >= VISIBLE_COUNT ? VISIBLE_COUNT : count
  const height = !count ? undefined : (!withInput ? 0 : 56) + 540
  const checkOnLoadMore = checkPartialOnLoadMore(data, content)

  const onAdd = async (topic: TopicDto) => {
    await mutate([{ content: [topic], last: false }, ...(data || [])], false)
    setDiscussionCount(count + 1)
  }

  const onLoadMore = () => setSize(size + 1)

  function getContent() {
    return data?.map((d) => d.content).flat()
  }

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} height={height}>
      <>
        {(!count || content) && withInput && (
          <User tmpl="input" dayId={dayId} user={client as UserBaseDto} onAdd={onAdd} />
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
                    <Topic
                      dayId={dayId}
                      topic={topic}
                      role={role}
                      owner={owner}
                      inView={checkOnLoadMore(index)}
                      onView={onLoadMore}
                    />
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
