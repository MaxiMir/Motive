import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core'
import { UserDetailDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import AppContainer from 'components/UI/AppContainer'
import useFollowers from './hook'
import Loader from './components/Loader'
import i18n from './i18n'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

export interface ModalFollowersProps {
  tmpl: 'followers'
  user: UserDetailDto
  locale: Locale
  onClose: () => void
}

export default function ModalFollowers({ user, locale, onClose }: ModalFollowersProps): JSX.Element {
  const { id, characteristic } = user
  const classes = useStyles()
  const { isLoading, followers, checkOnLoadMore, fetchNextPage } = useFollowers(id, characteristic.followers)
  const { title } = i18n[locale]

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <AppContainer flexColumn className={classes.container}>
        {isLoading ? (
          <Loader count={user.characteristic.followers} />
        ) : (
          <>
            {!followers?.length ? (
              <EmptyList />
            ) : (
              <UserList users={followers} checkOnLoadMore={checkOnLoadMore} onView={fetchNextPage} />
            )}
          </>
        )}
      </AppContainer>
    </AppModal>
  )
}

const useStyles = makeStyles({
  container: {
    height: 440,
    padding: 0,
    overflow: 'scroll',
  },
})
