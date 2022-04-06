import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material'
import { UserDetailDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import useGoals from './hook'

const Loader = dynamic(() => import('./components/Loader'))
const EmptyList = dynamic(() => import('./components/EmptyList'))
const ConfirmationsList = dynamic(() => import('./components/ConfirmationsList'))

export interface ModalCompletedProps {
  tmpl: 'completed'
  user: UserDetailDto
  locale: Locale
  onClose: () => void
}

export default function ModalCompleted({ user, onClose }: ModalCompletedProps): JSX.Element {
  const { id, characteristic } = user
  const theme = useTheme()
  const { isLoading, confirmations, checkOnLoadMore, fetchNextPage } = useGoals(id, characteristic.completed)

  return (
    <AppModal
      title={
        <>
          <AppBox component="span" display={undefined} sx={{ color: theme.text.sand }}>
            Completed
          </AppBox>{' '}
          goals
        </>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <AppContainer flexColumn sx={{ minHeight: 440, padding: 0 }}>
        {isLoading ? (
          <Loader count={characteristic.completed} />
        ) : (
          <>
            {!confirmations?.length ? (
              <EmptyList />
            ) : (
              <ConfirmationsList
                confirmations={confirmations}
                userId={id}
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
