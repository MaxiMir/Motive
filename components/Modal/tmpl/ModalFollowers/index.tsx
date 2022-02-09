import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core'
import { UserDetailDto } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppContainer from 'components/UI/AppContainer'
import useFollowers from './hook'
import Loader from './components/Loader'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

export interface ModalFollowersProps {
  tmpl: 'followers'
  user: UserDetailDto
  onClose: () => void
}

export default function ModalFollowers({ user, onClose }: ModalFollowersProps): JSX.Element {
  const { id, characteristic } = user
  const classes = useStyles()
  const { isLoading, followers, checkOnLoadMore, fetchNextPage } = useFollowers(id, characteristic.followers)

  return (
    <AppModal title="Followers" maxWidth="xs" onClose={onClose}>
      <AppContainer flexColumn className={classes.container}>
        {isLoading ? (
          <Loader count={user.characteristic.followers} />
        ) : (
          <>
            {!followers?.length ? (
              <EmptyList />
            ) : (
              <UserList users={followers} checkOnLoadMore={checkOnLoadMore} onLoadMore={fetchNextPage} />
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
