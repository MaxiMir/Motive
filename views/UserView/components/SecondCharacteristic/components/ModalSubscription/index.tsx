import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import i18nCommon from 'constants/i18n'
import { SecondCharacteristicName, UserDetailDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { ucFirst } from 'helpers/prepare'
import AppModal from 'components/ui/AppModal'
import useSubscription from './hook'
import Loader from './components/Loader'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

export interface ModalFollowersProps {
  user: UserDetailDto
  name: SecondCharacteristicName.Followers | SecondCharacteristicName.Following
  onClose: () => void
}

export default function ModalSubscription({ user, name, onClose }: ModalFollowersProps) {
  const { id, characteristic } = user
  const { locale } = useLocale()
  const { isLoading, followers, checkOnLoadMore, fetchNextPage } = useSubscription(id, characteristic.followers, name)
  const title = ucFirst(i18nCommon[locale][name])

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
          <Loader count={user.characteristic.followers} />
        ) : (
          <>
            {!followers?.length ? (
              <EmptyList locale={locale} />
            ) : (
              <UserList users={followers} checkOnLoadMore={checkOnLoadMore} onView={fetchNextPage} onClose={onClose} />
            )}
          </>
        )}
      </Box>
    </AppModal>
  )
}
