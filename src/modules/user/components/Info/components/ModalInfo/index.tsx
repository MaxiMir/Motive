import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { UserDetailDto } from '@dto'
import AppModal from '@ui/AppModal'
import InfoRow from './components/InfoRow'

interface ModalInfoProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalInfo({ user, onClose }: ModalInfoProps) {
  const { nickname, bio, motto, location } = user
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.info' })

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={1}>
        {motto && <InfoRow icon="short_text" text={motto} />}
        <InfoRow icon="alternate_email" text={nickname} />
        {location && <InfoRow icon="location_on" text={location} />}
        {bio && <InfoRow icon="self_improvement" text={bio} />}
      </Box>
    </AppModal>
  )
}
