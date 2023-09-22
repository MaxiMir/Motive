import { Box, Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDeviceContext } from 'entities/device'
import { useViewer } from 'entities/viewer'
import { DayDto, UserBaseDto } from 'shared/api'
import { toCheckOnLoadMore } from 'shared/lib/utils'
import Modal from 'shared/ui/Modal'
import { useDiscussion } from './lib'

const CreateTopic = dynamic(() => import('features/topic/create-topic'))
const EmptyList = dynamic(() => import('./emptyList'))
const Loader = dynamic(() => import('./loader'))
const Topic = dynamic(() => import('./topic'))

interface DiscussionModalProps {
  day: DayDto
  owner: UserBaseDto
  viewerGoal: boolean
  onClose: () => void
}

function DiscussionModal({ day, owner, viewerGoal, onClose }: DiscussionModalProps) {
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
  const { isLoading, data, hasNextPage, fetchNextPage } = useDiscussion(day)
  const topics = data?.pages.flat() || []
  const checkOnInView = toCheckOnLoadMore(topics.length, hasNextPage)
  const title = formatMessage({ id: 'common.discussion' })

  return (
    <Modal
      title={title}
      maxWidth="md"
      contentHeight={600}
      fullScreen={isMobile}
      dividers
      actions={
        !viewer || isLoading
          ? undefined
          : [
              <Box pt={1} flex={1} key="panel">
                <CreateTopic
                  type={!viewerGoal ? 'question' : 'support'}
                  dayId={day.id}
                  owner={owner}
                  user={viewer}
                  viewerGoal={viewerGoal}
                />
              </Box>,
            ]
      }
      onClose={onClose}
    >
      <Stack gap={2} flex={1} height="100%" position="relative">
        <>
          {isLoading ? (
            <Loader count={day.topicCount} />
          ) : (
            <>
              {!day.topicCount ? (
                <EmptyList />
              ) : (
                <Stack flex={1} gap={2} mt={1} pb={3}>
                  {topics.map((topic, index) => (
                    <Topic
                      dayId={day.id}
                      topic={topic}
                      owner={owner}
                      key={topic.id}
                      isOwner={viewerGoal}
                      inView={checkOnInView(index)}
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
