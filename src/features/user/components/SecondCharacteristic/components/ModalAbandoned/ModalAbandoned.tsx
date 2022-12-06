import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import useUserContext from '@features/user/hooks/useUserContext'
import useShowProgress from '@hooks/useShowProgress'
import AppModal from '@ui/AppModal/AppModal'
import OldPittRules from '@components/OldPitt/OldPittRules/OldPittRules'
import webSrc from 'public/images/svg/web.svg'
import useMessages from './hooks/useMessages'

interface ModalAbandonedProps {
  onClose: () => void
}

function ModalAbandoned({ onClose }: ModalAbandonedProps) {
  const { characteristic } = useUserContext()
  const messages = useMessages()
  const progress = useShowProgress(characteristic.abandoned, { step: 1, ms: 300 })
  const roundedProgress = Math.round(progress)

  return (
    <AppModal
      title={
        <Box component="span" sx={{ color: 'abandoned.main' }}>
          {messages.title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={2} position="relative">
        <Box display="flex" justifyContent="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h2" component="p" sx={{ color: 'abandoned.main' }}>
              {roundedProgress}
            </Typography>
            <Image src={webSrc} alt="" width={60} height={60} />
          </Box>
        </Box>
        <Typography component="h3" textAlign="center">
          {messages.header}.
        </Typography>
        <OldPittRules />
      </Box>
    </AppModal>
  )
}

export default ModalAbandoned
