import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useAddMessage, useClient } from 'entities/user'
import { TopicDto, MessageType, UserBaseDto } from 'shared/api'
import { ListProps } from 'shared/ui/List'
import Modal from 'shared/ui/Modal'
import { useDiscussion } from './lib'

const List = dynamic<ListProps<TopicDto>>(() => import('shared/ui/List'))
const CreateTopic = dynamic(() => import('features/topic/create-topic'))
const EmptyList = dynamic(() => import('./emptyList'))
const Loader = dynamic(() => import('./loader'))
const Topic = dynamic(() => import('./topic'))

interface DiscussionModalProps {
  dayId: number
  count: number
  owner: UserBaseDto
  clientGoal: boolean
  onClose: () => void
}

function DiscussionModal({ dayId, count, owner, clientGoal, onClose }: DiscussionModalProps) {
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const withInput = !!client && !clientGoal
  const minHeight = topics.length || withInput ? 130 : undefined

  return (
    <Modal title="Discussion" maxWidth="md" staticHeight onClose={onClose}>
      <Stack gap={2} minHeight={minHeight} flex={1}>
        <>
          {isLoading ? (
            <Loader count={count} withInput={withInput} />
          ) : (
            <>
              {withInput && (
                <CreateTopic
                  dayId={dayId}
                  user={client}
                  type={MessageType.Question}
                  onAdd={onAdd}
                />
              )}
              {!count ? (
                <EmptyList />
              ) : (
                <List
                  elements={topics}
                  keyGetter={(topic) => topic.id}
                  gap={2}
                  mt={1}
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
    </Modal>
  )
}

export default DiscussionModal
