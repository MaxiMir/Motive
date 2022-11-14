import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { UserDetailDto } from '@dto'
import AppModal from '@ui/AppModal'
import InfoRow from './components/InfoRow'

interface ModalLearnMoreProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalLearnMore({ user, onClose }: ModalLearnMoreProps) {
  const { nickname, bio, motto } = user
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.learn-more' })

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={1}>
        {motto && <InfoRow icon="alternate_email" text={motto} />}
        <InfoRow icon="alternate_email" text={nickname} />
        {bio && <InfoRow icon="short_text" text={bio} />}
      </Box>
    </AppModal>
  )
}
