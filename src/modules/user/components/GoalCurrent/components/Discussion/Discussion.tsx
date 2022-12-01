import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { TopicDto, MessageType, UserBaseDto, ClientDto } from '@dto'
import useClient from '@hooks/useClient'
import { AppListProps } from '@ui/AppList'
import useAddMessage from '@user-hooks/useAddMessage'
import useDiscussion from './hooks/useDiscussion'

const AppList = dynamic<AppListProps<TopicDto>>(() => import('@ui/AppList'))
const UserInput = dynamic(() => import('./components/UserInput'))
const Nothing = dynamic(() => import('./components/Nothing'))
const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))

interface DiscussionProps {
  dayId: number
  owner: UserBaseDto
  count: number
  clientGoal: boolean
}

function Discussion({ dayId, owner, count, clientGoal }: DiscussionProps) {
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const showInput = !!client && (!count || !!topics.length) && !clientGoal
  const minHeight = topics.length || showInput ? 130 : undefined

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1} minHeight={minHeight} maxHeight={500}>
      <>
        {showInput && <UserInput dayId={dayId} user={client as ClientDto} type={MessageType.Question} onAdd={onAdd} />}
        {!count ? (
          <Nothing />
        ) : (
          <>
            {isLoading ? (
              <Loader count={count} withInput={!clientGoal} />
            ) : (
              <AppList
                elements={topics}
                keyGetter={(topic) => topic.id}
                gap={2}
                pb={2}
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
    </Box>
  )
}

export default Discussion
