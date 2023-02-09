import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useAddMessage, useClient } from 'entities/user'
import { TopicDto, MessageType, UserBaseDto } from 'shared/api'
import { ListProps } from 'shared/ui/List'
import { useDiscussion } from './lib'

const List = dynamic<ListProps<TopicDto>>(() => import('shared/ui/List'))
const CreateTopic = dynamic(() => import('features/topic/create-topic'))
const Nothing = dynamic(() => import('./emptyList'))
const Loader = dynamic(() => import('./loader'))
const Topic = dynamic(() => import('./topic'))

interface DiscussionProps {
  dayId: number
  count: number
  owner: UserBaseDto
  clientGoal: boolean
}

export function Discussion({ dayId, count, owner, clientGoal }: DiscussionProps) {
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const withInput = !!client && !clientGoal
  const minHeight = topics.length || withInput ? 130 : undefined

  return (
    <Stack gap={2} minHeight={minHeight} maxHeight={500} flex={1}>
      <>
        {isLoading ? (
          <Loader count={count} withInput={withInput} />
        ) : (
          <>
            {withInput && (
              <CreateTopic dayId={dayId} user={client} type={MessageType.Question} onAdd={onAdd} />
            )}
            {!count ? (
              <Nothing />
            ) : (
              <List
                elements={topics}
                keyGetter={(topic) => topic.id}
                gap={2}
                pb={3}
                render={(topic, index) => (
                  <Topic
                    dayId={dayId}
                    topic={topic}
                    owner={owner}
                    isOwner={clientGoal}
                    inView={checkOnLoadMore(index)}
                    onView={fetchNextPage}
                    onAdd={onAdd}
                  />
                )}
              />
            )}
          </>
        )}
      </>
    </Stack>
  )
}
