import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@components/Share'))
const MenuActions = dynamic(() => import('./components/MenuActions'))

interface UserMenuProps {
  id: number
  name: string
}

function UserMenu({ id, name }: UserMenuProps) {
  const { asPath } = useRouter()
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onCloseShare = () => setWithShare(false)

  return (
    <>
      <TooltipArrow title={messages.title}>
        <IconButton
          aria-label={messages.title}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={onOpen}
        >
          <AppIcon name="more_vert" />
        </IconButton>
      </TooltipArrow>
      {anchorEl && <MenuActions anchorEl={anchorEl} id={id} onShare={onShare} onClose={onClose} />}
      {withShare && <Share title={name} href={asPath} onClose={onCloseShare} />}
    </>
  )
}

export default UserMenu
