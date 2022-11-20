import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { UserDetailDto } from '@dto'
import AppModal from '@ui/AppModal'
import InfoRow from './components/InfoRow'

const ROWS = [
  { name: 'registered', icon: 'assignment_turned_in' },
  { name: 'motto', icon: 'short_text' },
  { name: 'nickname', icon: 'alternate_email' },
  { name: 'location', icon: 'location_on' },
  { name: 'bio', icon: 'self_improvement' },
] as const

interface ModalInfoProps {
  user: UserDetailDto
  onClose: () => void
}

export default function ModalInfo({ user, onClose }: ModalInfoProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.info' })

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={1}>
        {ROWS.map(({ name, icon }) => {
          const value = user[name]

          return <>{value && <InfoRow icon={icon} name={name} value={value} />}</>
        })}
      </Box>
    </AppModal>
  )
}
