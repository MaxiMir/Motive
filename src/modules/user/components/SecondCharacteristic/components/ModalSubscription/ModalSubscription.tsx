import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import { SecondCharacteristicName } from '@features/characteristic'
import AppModal from '@ui/AppModal/AppModal'
import { useMessages, useSubscription } from './hooks'
import Loader from './components/Loader'

const EmptyList = dynamic(() => import('./components/EmptyList/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface ModalFollowersProps {
  name: SecondCharacteristicName.Followers | SecondCharacteristicName.Following
  onClose: () => void
}

function ModalSubscription({ name, onClose }: ModalFollowersProps) {
  const messages = useMessages(name)
  const { id, characteristic } = useUserContext()
  const { isLoading, followers, checkOnLoadMore, fetchNextPage } = useSubscription(id, characteristic.followers, name)

  return (
    <AppModal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Box
        display="flex"
        flex={1}
        minHeight={400}
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
          <Loader count={characteristic.followers} />
        ) : (
          <>
            {!followers?.length ? (
              <EmptyList />
            ) : (
              <UserList users={followers} checkOnLoadMore={checkOnLoadMore} onView={fetchNextPage} onClose={onClose} />
            )}
          </>
        )}
      </Box>
    </AppModal>
  )
}

export default ModalSubscription
