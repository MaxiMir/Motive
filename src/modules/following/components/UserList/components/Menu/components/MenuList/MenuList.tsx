import { Menu, MenuItem } from '@mui/material'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useMessages } from './hooks/useMessages'

interface MenuListProps {
  anchorEl: HTMLElement
  onShare: () => void
  onRemove: () => void
  onClose: () => void
}

function MenuList({ anchorEl, onShare, onRemove, onClose }: MenuListProps) {
  const messages = useMessages()

  return (
    <Menu id="user-menu" anchorEl={anchorEl} open={!!anchorEl} onClick={onClose} onClose={onClose}>
      <MenuItem onClick={onShare}>
        <AppMenuItemContent icon="share" text={messages.shareText} />
      </MenuItem>
      <MenuItem onClick={onRemove}>
        <AppMenuItemContent icon="remove_circle_outline" text={messages.removeText} />
      </MenuItem>
    </Menu>
  )
}

export default MenuList
