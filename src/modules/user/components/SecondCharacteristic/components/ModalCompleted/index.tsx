import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { UserDetailDto } from 'src/common/dto'
import AppModal from 'src/common/ui/AppModal'
import { ucFirst } from 'src/common/helpers/prepare'
import useGoals from './hook'

const Loader = dynamic(() => import('./components/Loader'))
const EmptyList = dynamic(() => import('./components/EmptyList'))
const ConfirmationsList = dynamic(() => import('./components/ConfirmationsList'))

export interface ModalCompletedProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalCompleted({ user, onClose }: ModalCompletedProps) {
  const { id, characteristic } = user
  const { formatMessage } = useIntl()
  const { isLoading, confirmations } = useGoals(id, characteristic.completed)
  const title = ucFirst(formatMessage({ id: 'common.completed' }))
  const subtitle = formatMessage({ id: 'common.goals' })

  return (
    <AppModal
      title={
        <>
          <Box component="span" sx={{ color: 'zen.sand' }}>
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
            {!confirmations?.length ? <EmptyList /> : <ConfirmationsList confirmations={confirmations} user={user} />}
          </>
        )}
      </Box>
    </AppModal>
  )
}
