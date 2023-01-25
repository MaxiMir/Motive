import { useState, MouseEvent, useId } from 'react'
import dynamic from 'next/dynamic'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { share } from '@shared/lib/helpers/navigator'
import { UserDto, toHref } from '@entities/user'
import { useRemoveFollowing } from '@entities/subscription'
import useToggle from '@shared/lib/hooks/useToggle'
import ListItem from '@shared/ui/ListItem'
import Icon from '@shared/ui/Icon'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@features/share'))

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
  const href = toHref(nickname)
  const open = Boolean(anchorEl)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = () => share(href, name, toggleSharing)

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

export default MenuActions
