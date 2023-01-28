import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import { useSubscription } from 'entities/subscription'
import { SecondCharacteristicName } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useMessages } from './lib'

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
  const messages = useMessages(type)
  const { isLoading, users, checkOnLoadMore, fetchNextPage } = useSubscription(userId, count, type)
  const titleColor = type === SecondCharacteristicName.Followers ? 'zen.sand' : undefined

  return (
    <Modal
      title={
        <Box component="span" color={titleColor}>
          {messages.title}
        </Box>
      }
      maxWidth="xs"
      PaperProps={{
        sx: {
          height: 600,
        },
      }}
      onClose={onClose}
    >
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
