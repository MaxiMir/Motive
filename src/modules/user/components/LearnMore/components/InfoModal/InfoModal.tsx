import Link from 'next/link'
import { Stack, Typography } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import { toHref } from '@features/user'
import Modal from '@ui/Modal'
import AvatarStatus from '@components/AvatarStatus'
import Row from './components/Row'
import { useMessages } from './hooks/useMessages'
import { ROWS } from './helpers/table'

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
