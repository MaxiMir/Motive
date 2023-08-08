import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useCheckOnMobile } from 'entities/device'
import { useClient } from 'entities/viewer'
import { TopicDto, UserBaseDto } from 'shared/api'
import { ListProps } from 'shared/ui/List'
import Modal from 'shared/ui/Modal'
import { useDiscussion } from './lib'

const List = dynamic<ListProps<TopicDto>>(() => import('shared/ui/List'))
const EmptyList = dynamic(() => import('./emptyList'))
const Loader = dynamic(() => import('./loader'))
const Topic = dynamic(() => import('./topic'))
const TopicPanel = dynamic(() => import('./topicPanel'))

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
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const mobile = useCheckOnMobile()
  const title = formatMessage({ id: 'common.discussion' })

  return (
    <Modal
      title={title}
      maxWidth="md"
      staticHeight
      fullScreen={mobile}
      dividers
      actions={
        !client || isLoading
          ? undefined
          : [
              <TopicPanel
                dayId={dayId}
                user={client}
                owner={owner}
                clientGoal={clientGoal}
                key="panel"
              />,
            ]
      }
      onClose={onClose}
    >
      <Stack gap={2} flex={1} height="100%" position="relative">
        <>
          {isLoading ? (
            <Loader count={count} />
          ) : (
            <>
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
