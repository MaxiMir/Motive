import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useUserContext } from '@pages/user/hooks'
import AvatarStatus from '@features/avatar-status'
import { toHref } from '@entities/user'
import Modal from '@shared/ui/Modal'
import Row from './components/Row'
import { ROWS } from './helpers/table'
import { useMessages } from './hooks/useMessages'

interface InfoModalProps {
  onClose: () => void
}

function InfoModal({ onClose }: InfoModalProps) {
  const messages = useMessages()
  const user = useUserContext()
  const userHref = toHref(user.nickname)

  return (
    <Modal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Stack spacing={1}>
        <Stack alignItems="center" spacing={1} mb={2}>
          <AvatarStatus src={user.avatar} name={user.name} size={80} />
          <Link href={userHref}>
            <Typography color="primary" component="span">
              {user.nickname}
            </Typography>
          </Link>
          <Typography>{user.motto}</Typography>
        </Stack>
        {ROWS.map(({ name, icon }) => (
          <Row icon={icon} name={name} value={user[name]} key={name} />
        ))}
      </Stack>
    </Modal>
  )
}

export default InfoModal
