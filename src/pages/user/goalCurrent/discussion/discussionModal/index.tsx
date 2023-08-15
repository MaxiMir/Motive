import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDetectMobile } from 'entities/device'
import { useViewer } from 'entities/viewer'
import { UserBaseDto } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useDiscussion } from './lib'

const EmptyList = dynamic(() => import('./emptyList'))
const Loader = dynamic(() => import('./loader'))
const Topic = dynamic(() => import('./topic'))
const TopicPanel = dynamic(() => import('./topicPanel'))

interface DiscussionModalProps {
  dayId: number
  count: number
  owner: UserBaseDto
  viewerGoal: boolean
  onClose: () => void
}

function DiscussionModal({ dayId, count, owner, viewerGoal, onClose }: DiscussionModalProps) {
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const mobile = useDetectMobile()
  const title = formatMessage({ id: 'common.discussion' })

  return (
    <Modal
      title={title}
      maxWidth="md"
      staticHeight
      fullScreen={mobile}
      dividers
      actions={
        !viewer || isLoading
          ? undefined
          : [
              <TopicPanel
                dayId={dayId}
                user={viewer}
                owner={owner}
                viewerGoal={viewerGoal}
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
                <Stack flex={1} gap={2} mt={1} pb={3}>
                  {topics.map((topic, index) => (
                    <Topic
                      dayId={dayId}
                      topic={topic}
                      owner={owner}
                      key={topic.id}
                      isOwner={viewerGoal}
                      inView={checkOnLoadMore(index)}
                      onView={fetchNextPage}
                    />
                  ))}
                </Stack>
              )}
            </>
          )}
        </>
      </Stack>
    </Modal>
  )
}

export default DiscussionModal
