import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
// eslint-disable-next-line import/no-internal-modules
import webSrc from 'public/images/svg/web.svg'
import { UserCharacteristicDto } from 'shared/api'
import { useShowProgress } from 'shared/lib/hooks'
import Modal from 'shared/ui/Modal'
import { OldPittRules } from 'shared/ui/oldPittRules'
import { useMessages } from './lib'

interface AbandonedModalProps {
  characteristic: UserCharacteristicDto
  onClose: () => void
}

function AbandonedModal({ characteristic, onClose }: AbandonedModalProps) {
  const messages = useMessages()
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
