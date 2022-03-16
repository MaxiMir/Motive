import dynamic from 'next/dynamic'
import { createStyles, makeStyles } from '@material-ui/core'
import { UserDetailDto } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppContainer from 'components/UI/AppContainer'
import useGoals from './hook'

const Loader = dynamic(() => import('./components/Loader'))
const EmptyList = dynamic(() => import('./components/EmptyList'))
const ConfirmationsList = dynamic(() => import('./components/ConfirmationsList'))

export interface ModalCompletedProps {
  tmpl: 'completed'
  user: UserDetailDto
  onClose: () => void
}

export default function ModalCompleted({ user, onClose }: ModalCompletedProps): JSX.Element {
  const { id, characteristic } = user
  const classes = useStyles()
  const { isLoading, confirmations, checkOnLoadMore, fetchNextPage } = useGoals(id, characteristic.completed)

  return (
    <AppModal
      title={
        <>
          <span className={classes.completed}>Completed</span> goals
        </>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <AppContainer flexColumn className={classes.container}>
        {isLoading ? (
          <Loader count={characteristic.completed} />
        ) : (
          <>
            {!confirmations?.length ? (
              <EmptyList />
            ) : (
              <ConfirmationsList
                confirmations={confirmations}
                checkOnLoadMore={checkOnLoadMore}
                onView={fetchNextPage}
              />
            )}
          </>
        )}
      </AppContainer>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      minHeight: 440,
      padding: 0,
    },
    completed: {
      color: theme.text.sand,
    },
  }),
)
