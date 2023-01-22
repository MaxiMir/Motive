import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import { SecondCharacteristicName } from '@features/characteristic'
import AppModal from '@ui/AppModal'
import { useMessages } from './hooks/useMessages'
import { useSubscription } from './hooks/useSubscription'
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
    <AppModal
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
    </AppModal>
  )
}

export default SubscriptionModal
