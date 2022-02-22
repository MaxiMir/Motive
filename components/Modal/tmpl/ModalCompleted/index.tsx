import dynamic from 'next/dynamic'
import { createStyles, makeStyles } from '@material-ui/core'
import { UserDetailDto } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppContainer from 'components/UI/AppContainer'
import useGoals from './hook'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const GoalList = dynamic(() => import('./components/GoalList'))

export interface ModalCompletedProps {
  tmpl: 'completed'
  user: UserDetailDto
  onClose: () => void
}

export default function ModalCompleted({ user, onClose }: ModalCompletedProps): JSX.Element {
  const { id, characteristic } = user
  const classes = useStyles()
  const { isLoading, goals, checkOnLoadMore, fetchNextPage } = useGoals(id, characteristic.completed)

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
          <>Loading...</>
        ) : (
          <>
            {!goals?.length ? (
              <EmptyList />
            ) : (
              <GoalList goals={goals} checkOnLoadMore={checkOnLoadMore} onLoadMore={fetchNextPage} />
            )}
          </>
        )}
      </AppContainer>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    completed: {
      color: theme.text.sand,
    },
    container: {
      height: 440,
      padding: 0,
      overflow: 'scroll',
    },
  }),
)
