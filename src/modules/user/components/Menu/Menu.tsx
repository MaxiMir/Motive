import dynamic from 'next/dynamic'
import { MouseEvent, useState } from 'react'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { UserBaseDto } from '@dto'
import AppMenuButton from '@ui/AppMenuButton'

const Share = dynamic(() => import('@components/Share'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  href: string
  user: UserBaseDto
  clientPage: boolean
}

export default function Menu({ user, href, clientPage }: MenuProps) {
  const { id, name } = user
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const title = formatMessage({ id: 'common.open-menu' })
  const ariaControls = formatMessage({ id: 'common.menu' })

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onCloseShare = () => setWithShare(false)

  return (
    <Box alignSelf="flex-end">
      <AppMenuButton title={title} color="primary" ariaControls={ariaControls} horizontal onClick={onOpen} />
      {anchorEl && (
        <MenuList anchorEl={anchorEl} userId={id} clientPage={clientPage} onShare={onShare} onClose={onClose} />
      )}
      {withShare && <Share title={name} href={href} onClose={onCloseShare} />}
    </Box>
  )
}
