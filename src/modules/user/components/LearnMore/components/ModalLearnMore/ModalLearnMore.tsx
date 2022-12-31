import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import { getUserHref } from '@features/user'
import AppModal from '@ui/AppModal'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import Row from './components/Row'
import { useMessages } from './hooks/useMessages'
import { ROWS } from './helpers/table'

interface ModalLearnMoreProps {
  onClose: () => void
}

function ModalLearnMore({ onClose }: ModalLearnMoreProps) {
  const messages = useMessages()
  const user = useUserContext()
  const userHref = getUserHref(user.nickname)

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
          <Link href={userHref}>
            <Typography color="primary" component="span">
              {user.nickname}
            </Typography>
          </Link>
          <Typography>{user.motto}</Typography>
        </Box>
        {ROWS.map(({ name, icon }) => (
          <Row icon={icon} name={name} value={user[name]} key={name} />
        ))}
      </Box>
    </AppModal>
  )
}

export default ModalLearnMore
