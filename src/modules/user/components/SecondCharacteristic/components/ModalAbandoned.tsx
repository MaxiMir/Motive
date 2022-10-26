import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { UserDetailDto } from '@dto'
import useShowProgress from '@hooks/useShowProgress'
import AppModal from '@ui/AppModal'
import OldPittRules from '@components/OldPitt/OldPittRules'
import Image from 'next/image'

export interface ModalAbandonedProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalAbandoned({ user, onClose }: ModalAbandonedProps) {
  const { abandoned } = user.characteristic
  const { formatMessage } = useIntl()
  const progress = useShowProgress(abandoned, { step: 1, ms: 300 })
  const title = formatMessage({ id: 'common.abandoned' })
  const header = formatMessage({ id: 'page.user.modal-abandoned.header' })
  const roundedProgress = Math.round(progress)

  return (
    <AppModal
      title={
        <Box component="span" sx={{ color: 'abandoned.main' }}>
          {title}
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
            <Image src="/images/svg/web.svg" alt="" width={60} height={60} />
          </Box>
        </Box>
        <Typography variant="h6" component="h3">
          {header}.
        </Typography>
        <OldPittRules />
      </Box>
    </AppModal>
  )
}
