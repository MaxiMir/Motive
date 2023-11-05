import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useDeviceContext } from 'entities/device'
import { UserPageDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import { ROWS } from './consts'
import { Row } from './row'

const Modal = dynamic(() => import('shared/ui/modal'))
const Drawer = dynamic(() => import('shared/ui/drawer'))

interface AdditionalInfoModalProps {
  user: UserPageDto
  onClose: () => void
}

function AdditionalInfoModal({ user, onClose }: AdditionalInfoModalProps) {
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
  const userHref = joinToHref(user.nickname)
  const title = formatMessage({ id: 'common.info' })
  const ModalComponent = isMobile ? Drawer : Modal

  return (
    <ModalComponent title={title} onClose={onClose}>
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
    </ModalComponent>
  )
}

export default AdditionalInfoModal
