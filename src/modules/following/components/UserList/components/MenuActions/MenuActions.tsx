import { useState, MouseEvent, useId } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@mui/material'
import { UserDto, getUserHref } from '@features/user'
import { useRemoveFollowing } from '@features/subscription'
import useToggle from '@hooks/useToggle'
import AppMenuButton from '@ui/AppMenuButton'
import AppMenuItem from '@ui/AppMenuItem'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@components/Share'))

interface MenuActionsProps {
  user: UserDto
  index: number
}

function MenuActions({ user, index }: MenuActionsProps) {
  const { name, nickname } = user
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const removeFollowing = useRemoveFollowing()
  const href = getUserHref(nickname)
  const open = Boolean(anchorEl)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onRemove = () => removeFollowing(user, index)

  return (
    <>
      <AppMenuButton
        id={id}
        title={messages.title}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onOpen}
      />
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClick={onClose}
        onClose={onClose}
      >
        <AppMenuItem icon="share" text={messages.shareText} onClick={toggleSharing} />
        <AppMenuItem
          icon="remove_circle_outline"
          text={messages.removeText}
          color="error.dark"
          onClick={onRemove}
        />
        <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
      </Menu>
      {sharing && <Share title={name} href={href} onClose={toggleSharing} />}
    </>
  )
}

export default MenuActions
