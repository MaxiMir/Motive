import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import { SecondCharacteristicName } from '@features/characteristic'
import AppModal from '@ui/AppModal/AppModal'
import { useSubscription } from './hooks/useSubscription'
import Loader from './components/Loader'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface ModalFollowersProps {
  name: SecondCharacteristicName.Followers | SecondCharacteristicName.Following
  onClose: () => void
}

function ModalSubscription({ name, onClose }: ModalFollowersProps) {
  const { formatMessage } = useIntl()
  const { id, characteristic } = useUserContext()
  const { isLoading, followers, checkOnLoadMore, fetchNextPage } = useSubscription(id, characteristic.followers, name)
  const title = formatMessage({ id: `common.${name}` })

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
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
