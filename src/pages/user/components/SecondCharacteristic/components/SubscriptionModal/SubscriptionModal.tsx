import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import { useSubscription } from 'entities/subscription'
import { useUserContext } from 'entities/user'
import { SecondCharacteristicName } from 'shared/api'
import Modal from 'shared/ui/Modal'
import Loader from './components/Loader'
import { useMessages } from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface SubscriptionModalProps {
  name: SecondCharacteristicName.Followers | SecondCharacteristicName.Following
  onClose: () => void
}

function SubscriptionModal({ name, onClose }: SubscriptionModalProps) {
  const messages = useMessages(name)
  const { id, characteristic } = useUserContext()
  const count = characteristic[name]
  const { isLoading, users, checkOnLoadMore, fetchNextPage } = useSubscription(id, count, name)
  const titleColor = name === SecondCharacteristicName.Followers ? 'zen.sand' : undefined

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
