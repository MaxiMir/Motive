import { Box, Typography } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import AppModal from '@ui/AppModal'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import InfoRow from './components/InfoRow'
import { useMessages } from './hooks/useMessages'
import { ROWS } from './helpers/table'

interface InfoModalProps {
  onClose: () => void
}

function InfoModal({ onClose }: InfoModalProps) {
  const messages = useMessages()
  const user = useUserContext()

  return (
    <AppModal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mb={2}
        >
          <AvatarStatus src={user.avatar} name={user.name} size={80} />
          <Typography>{user.nickname}</Typography>
          <Typography>{user.motto}</Typography>
        </Box>
        {ROWS.map(({ name, icon }) => (
          <InfoRow icon={icon} name={name} value={user[name]} key={name} />
        ))}
      </Box>
    </AppModal>
  )
}

export default InfoModal
