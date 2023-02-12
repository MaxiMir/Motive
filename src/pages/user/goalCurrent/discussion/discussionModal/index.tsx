import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useAddMessage, useClient } from 'entities/user'
import { TopicDto, MessageType, UserBaseDto } from 'shared/api'
import { useDeviceContext } from 'shared/ui/device'
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
  const { formatMessage } = useIntl()
  const device = useDeviceContext()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const title = formatMessage({ id: 'common.discussion' })
  const withInput = !!client && !clientGoal
  const fullScreen = ['feature phone', 'smartphone', 'phablet'].includes(device || '')

  return (
    <Modal title={title} maxWidth="md" staticHeight fullScreen={fullScreen} onClose={onClose}>
      <Stack gap={2} flex={1} height="100%">
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
