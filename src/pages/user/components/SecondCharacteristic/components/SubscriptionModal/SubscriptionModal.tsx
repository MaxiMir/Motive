import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useUserContext } from '@pages/user/hooks'
import { useSubscription } from '@entities/subscription'
import Modal from '@shared/ui/Modal'
import { SecondCharacteristicName } from '@app/model/characteristic'
import { useMessages } from './hooks/useMessages'
import Loader from './components/Loader'

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
