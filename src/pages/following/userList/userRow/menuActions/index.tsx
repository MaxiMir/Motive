import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState, MouseEvent, useId } from 'react'
import dynamic from 'next/dynamic'
import { tryNativeShare } from 'features/share'
import { useRemoveFollowing } from 'features/subscription/remove-following'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

const Share = dynamic(() => import('features/share'))

interface MenuActionsProps {
  user: UserDto
  index: number
}

export function MenuActions({ user, index }: MenuActionsProps) {
  const { name, nickname } = user
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const { isLoading, remove } = useRemoveFollowing()
  const href = joinToHref(nickname)
  const open = Boolean(anchorEl)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = () => tryNativeShare(href, name, toggleSharing)

  const onRemove = () => remove(user, index)

  return (
    <>
      <TooltipArrow title={messages.title}>
        <IconButton
          id={id}
          size="small"
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={({ palette }) => ({ color: palette.grey[500] })}
          onClick={onOpenMenu}
        >
          <Icon name="more_horiz" />
        </IconButton>
      </TooltipArrow>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClick={onCloseMenu}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onShare}>
          <ListItem icon="share" primary={messages.shareText} />
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={onRemove}>
          <ListItem icon="delete" primary={messages.removeText} color="error.dark" />
        </MenuItem>
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {sharing && <Share href={href} title={name} onClose={toggleSharing} />}
    </>
  )
}
