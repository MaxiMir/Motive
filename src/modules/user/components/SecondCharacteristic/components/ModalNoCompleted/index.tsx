import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import AppModal from '@ui/AppModal'
import EmptyList from './components/EmptyList'

interface ModalNoCompletedProps {
  onClose: () => void
}

export default function ModalNoCompleted({ onClose }: ModalNoCompletedProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.completed' })
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
        <EmptyList />
      </Box>
    </AppModal>
  )
}
