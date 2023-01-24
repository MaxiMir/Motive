import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import { useUserContext } from '@pages/user/hooks'
import useShowProgress from '@hooks/useShowProgress'
import Modal from '@ui/Modal'
import OldPittRules from '@components/OldPitt/OldPittRules/OldPittRules'
import webSrc from 'public/images/svg/web.svg'
import { useMessages } from './hooks/useMessages'

interface AbandonedModalProps {
  onClose: () => void
}

function AbandonedModal({ onClose }: AbandonedModalProps) {
  const messages = useMessages()
  const { characteristic } = useUserContext()
  const progress = useShowProgress(characteristic.abandoned, { step: 1, ms: 300 })
  const roundedProgress = Math.round(progress)

  return (
    <Modal
      title={
        <Box component="span" color="abandoned.main">
          {messages.title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Stack position="relative" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2} alignSelf="center">
          <Typography variant="h2" component="p" sx={{ color: 'abandoned.main' }}>
            {roundedProgress}
          </Typography>
          <Image src={webSrc} alt="" width={60} height={60} />
        </Stack>
        <Typography component="h3" textAlign="center">
          {messages.header}.
        </Typography>
        <OldPittRules />
      </Stack>
    </Modal>
  )
}

export default AbandonedModal
