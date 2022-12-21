import { Box } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import AppModal from '@ui/AppModal/AppModal'
import InfoRow from './components/InfoRow/InfoRow'
import { useMessages } from './hooks/useMessages'
import { ROWS } from './helpers/table'

interface ModalInfoProps {
  onClose: () => void
}

function ModalInfo({ onClose }: ModalInfoProps) {
  const messages = useMessages()
  const user = useUserContext()

  return (
    <AppModal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={1}>
        {ROWS.map(({ name, icon }) => (
          <InfoRow icon={icon} name={name} value={user[name]} key={name} />
        ))}
      </Box>
    </AppModal>
  )
}

export default ModalInfo
