import { useState, MouseEvent, useId } from 'react'
import dynamic from 'next/dynamic'
import { IconButton, Menu } from '@mui/material'
import { UserDto, getUserHref } from '@features/user'
import { useRemoveFollowing } from '@features/subscription'
import useToggle from '@hooks/useToggle'
import AppMenuItem from '@ui/AppMenuItem'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
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
  const [isLoading, removeFollowing] = useRemoveFollowing()
  const href = getUserHref(nickname)
  const open = Boolean(anchorEl)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onRemove = () => removeFollowing(user, index)

  return (
    <>
      <TooltipArrow title={messages.title}>
        <IconButton
          id={id}
          size="small"
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={onOpen}
        >
          <AppIcon name="more_horiz" />
        </IconButton>
      </TooltipArrow>
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
          disabled={isLoading}
          onClick={onRemove}
        />
        <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
      </Menu>
      {sharing && <Share title={name} href={href} onClose={toggleSharing} />}
    </>
  )
}

export default MenuActions
