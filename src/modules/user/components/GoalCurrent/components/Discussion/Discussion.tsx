import dynamic from 'next/dynamic'
import { Stack } from '@mui/material'
import { useAddMessage } from '@modules/user/hooks'
import { UserBaseDto } from '@features/user'
import { TopicDto, MessageType } from '@features/topic'
import useClient from '@hooks/useClient'
import { ListProps } from '@ui/List'
import { useDiscussion } from './hooks/useDiscussion'

const List = dynamic<ListProps<TopicDto>>(() => import('@ui/List'))
const UserInput = dynamic(() => import('./components/UserInput'))
const Nothing = dynamic(() => import('./components/Nothing'))
const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))

interface DiscussionProps {
  owner: UserBaseDto
  count: number
  clientGoal: boolean
}

function Discussion({ owner, count, clientGoal }: DiscussionProps) {
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

export default Discussion
