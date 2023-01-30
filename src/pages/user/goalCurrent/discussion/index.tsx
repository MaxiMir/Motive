import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useAddMessage, useClient } from 'entities/user'
import { TopicDto, MessageType, UserBaseDto } from 'shared/api'
import { ListProps } from 'shared/ui/List'
import { useDiscussion } from './lib'

const List = dynamic<ListProps<TopicDto>>(() => import('shared/ui/List'))
const UserInput = dynamic(() => import('features/topic/create-topic'))
const Nothing = dynamic(() => import('./nothing'))
const Loader = dynamic(() => import('./loader'))
const Topic = dynamic(() => import('./topic'))

interface DiscussionProps {
  owner: UserBaseDto
  count: number
  clientGoal: boolean
}

export function Discussion({ owner, count, clientGoal }: DiscussionProps) {
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion()
  const onAdd = useAddMessage()
  const withInput = !!client && !clientGoal
  const minHeight = topics.length || withInput ? 130 : undefined

  return (
    <Stack spacing={2} minHeight={minHeight} maxHeight={500} flex={1}>
      <>
        {isLoading ? (
          <Loader count={count} withInput={withInput} />
        ) : (
          <>
            {withInput && <UserInput user={client} type={MessageType.Question} onAdd={onAdd} />}
            {!count ? (
              <Nothing />
            ) : (
              <List
                elements={topics}
                keyGetter={(topic) => topic.id}
                spacing={3}
                render={(topic, index) => (
                  <Topic
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
