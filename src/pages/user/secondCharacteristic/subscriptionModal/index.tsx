import { Box } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { SecondCharacteristicName } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useSubscription } from './lib'

const Loader = dynamic(() => import('./loader'))
const EmptyList = dynamic(() => import('./emptyList'))
const UserList = dynamic(() => import('./userList'))

interface SubscriptionModalProps {
  userId: number
  type: SecondCharacteristicName.Followers | SecondCharacteristicName.Following
  count: number
  onClose: () => void
}

function SubscriptionModal({ userId, type, count, onClose }: SubscriptionModalProps) {
  const { formatMessage } = useIntl()
  const { isLoading, users, checkOnLoadMore, fetchNextPage } = useSubscription(userId, count, type)
  const title = formatMessage({ id: `common.${type}` })

  return (
    <Modal title={title} maxWidth="xs" staticHeight onClose={onClose}>
      <Box
        display="flex"
        flex={1}
        sx={{
          '& sup': {
            display: {
              xs: 'none',
              sm: 'inline-block',
            },
          },
        }}
      >
        {isLoading ? (
          <Loader count={count} />
        ) : (
          <>
            {!users?.length ? (
              <EmptyList />
            ) : (
              <UserList
                users={users}
                checkOnLoadMore={checkOnLoadMore}
                onView={fetchNextPage}
                onClose={onClose}
              />
            )}
          </>
        )}
      </Box>
    </Modal>
  )
}

export default SubscriptionModal
