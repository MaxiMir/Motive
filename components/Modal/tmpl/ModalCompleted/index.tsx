import dynamic from 'next/dynamic'
import { Box, useTheme } from '@mui/material'
import { UserDetailDto } from 'dto'
import useLocale from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import useGoals from './hook'
import i18n from './i18n'

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
  const theme = useTheme()
  const { locale } = useLocale()
  const { isLoading, confirmations, checkOnLoadMore, fetchNextPage } = useGoals(id, characteristic.completed)
  const { title, subtitle } = i18n[locale]

  return (
    <AppModal
      title={
        <>
          <Box component="span" sx={{ color: theme.palette.zen.sand }}>
            {title}
          </Box>{' '}
          {subtitle}
        </>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={2} sx={{ minHeight: 400, overflow: 'scroll' }}>
        {isLoading ? (
          <Loader count={characteristic.completed} />
        ) : (
          <>
            {!confirmations?.length ? (
              <EmptyList locale={locale} />
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
      </Box>
    </AppModal>
  )
}
