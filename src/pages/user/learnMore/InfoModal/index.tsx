import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { useUserContext } from 'entities/user'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import Modal from 'shared/ui/Modal'
import { ROWS } from './consts'
import { Row } from './row'

interface InfoModalProps {
  onClose: () => void
}

function InfoModal({ onClose }: InfoModalProps) {
  const user = useUserContext()
  const { formatMessage } = useIntl()
  const userHref = joinToHref(user.nickname)
  const title = formatMessage({ id: 'common.info' })

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack spacing={1}>
        <Stack alignItems="center" spacing={1} mb={2}>
          <Avatar src={user.avatar} name={user.name} size={80} />
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
