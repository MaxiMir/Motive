import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDetectMobile } from 'entities/device'
import Modal from 'shared/ui/Modal'
import { useSubscription } from './lib'

const Loader = dynamic(() => import('./loader'))
const EmptyList = dynamic(() => import('./emptyList'))
const UserCard = dynamic(() => import('./userCard'))

interface SubscriptionModalProps {
  userId: number
  type: 'followers' | 'following'
  count: number
  onClose: () => void
}

function SubscriptionModal({ userId, type, count, onClose }: SubscriptionModalProps) {
  const { formatMessage } = useIntl()
  const mobile = useDetectMobile()
  const { isLoading, users, checkOnLoadMore, fetchNextPage } = useSubscription(userId, count, type)
  const title = formatMessage({ id: `common.${type}` })

  return (
    <Modal title={title} maxWidth="xs" contentHeight={600} fullScreen={mobile} onClose={onClose}>
      {isLoading ? (
        <Loader count={count} />
      ) : (
        <>
          {!users?.length ? (
            <EmptyList />
          ) : (
            <Stack flex={1} gap={2} height="100%">
              {users.map((user, index) => (
                <UserCard
                  user={user}
                  key={user.id}
                  inView={checkOnLoadMore(index)}
                  onView={fetchNextPage}
                  onClose={onClose}
                />
              ))}
            </Stack>
          )}
        </>
      )}
    </Modal>
  )
}

export default SubscriptionModal
