import { useState, MouseEvent, useId } from 'react'
import dynamic from 'next/dynamic'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { UserDto, getUserHref } from '@features/user'
import { useRemoveFollowing } from '@features/subscription'
import useToggle from '@hooks/useToggle'
import AppListItem from '@ui/AppListItem'
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
        <MenuItem onClick={toggleSharing}>
          <AppListItem icon="share" primary={messages.shareText} />
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={onRemove}>
          <AppListItem icon="delete" primary={messages.removeText} color="error.dark" />
        </MenuItem>
        <MenuItem onClick={onClose}>
          <AppListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {sharing && <Share title={name} href={href} onClose={toggleSharing} />}
    </>
  )
}

export default MenuActions
