import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { UserDetailDto } from 'dto'
import useLocale from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import useFollowers from './hook'
import Loader from './components/Loader'
import i18n from './i18n'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

export interface ModalFollowersProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalFollowers({ user, onClose }: ModalFollowersProps): JSX.Element {
  const { id, characteristic } = user
  const { locale } = useLocale()
  const { isLoading, followers, checkOnLoadMore, fetchNextPage } = useFollowers(id, characteristic.followers)
  const { title } = i18n[locale]

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box
        display="flex"
        minHeight={400}
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
          <Loader count={user.characteristic.followers} />
        ) : (
          <>
            {!followers?.length ? (
              <EmptyList locale={locale} />
            ) : (
              <UserList users={followers} checkOnLoadMore={checkOnLoadMore} onView={fetchNextPage} />
            )}
          </>
        )}
      </Box>
    </AppModal>
  )
}
