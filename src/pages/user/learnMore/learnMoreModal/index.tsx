import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { UserPageDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import Modal from 'shared/ui/Modal'
import { ROWS } from './consts'
import { Row } from './row'

interface LearnMoreModalProps {
  user: UserPageDto
  onClose: () => void
}

function LearnMoreModal({ user, onClose }: LearnMoreModalProps) {
  const { formatMessage } = useIntl()
  const userHref = joinToHref(user.nickname)
  const title = formatMessage({ id: 'common.info' })

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack gap={1}>
        <Stack alignItems="center" gap={1} mb={2}>
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

export default LearnMoreModal
