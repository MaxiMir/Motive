import { Menu } from '@mui/material'
import AppMenuItem from '@ui/AppMenuItem'
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
      <AppMenuItem icon="share" text={messages.shareText} onClick={onShare} />
      <AppMenuItem
        icon="remove_circle_outline"
        text={messages.removeText}
        color="error.dark"
        onClick={onRemove}
      />
      <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
    </Menu>
  )
}

export default MenuList
