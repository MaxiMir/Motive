import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { OwnershipDto } from '@features/member'
import AppMenuButton from '@ui/AppMenuButton'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@components/Share'))
const LeaveModal = dynamic(() => import('./components/LeaveModal'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuActionsProps {
  title: string
  href: string
  clientOwnership: OwnershipDto
}

function MenuActions({ title, href, clientOwnership }: MenuActionsProps) {
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const [withLeave, setWithLeave] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onCloseShare = () => setWithShare(false)

  const onLeave = () => {
    onClose()
    setWithLeave(true)
  }

  const onLeaveClose = () => setWithLeave(false)

  return (
    <>
      <AppMenuButton title={messages.buttonTitle} onClick={onOpen} />
      {anchorEl && (
        <MenuList
          anchorEl={anchorEl}
          clientOwnership={clientOwnership}
          onShare={onShare}
          onLeave={onLeave}
          onClose={onClose}
        />
      )}
      {withShare && <Share title={title} href={href} onClose={onCloseShare} />}
      {withLeave && <LeaveModal clientOwnership={clientOwnership} onClose={onLeaveClose} />}
    </>
  )
}

export default MenuActions
