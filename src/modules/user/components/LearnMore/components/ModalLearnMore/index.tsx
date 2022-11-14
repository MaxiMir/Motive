import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { UserDetailDto } from '@dto'
import AppModal from '@ui/AppModal'
import AppIcon from '@ui/AppIcon'

const Bio = dynamic(() => import('./components/Bio'))

interface ModalLearnMoreProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalLearnMore({ user, onClose }: ModalLearnMoreProps) {
  const { nickname, bio } = user
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.learn-more' })

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <AppIcon name="alternate_email" sx={{ color: 'zen.sand' }} />: {nickname}
        </Box>
        {bio && <Bio bio={bio} />}
      </Box>
    </AppModal>
  )
}
