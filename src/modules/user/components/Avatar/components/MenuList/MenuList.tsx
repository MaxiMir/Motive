import { Menu, MenuItem } from '@mui/material'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useMessages } from './hooks/useMessages'

interface MenuListProps {
  anchorEl: HTMLElement
  onOpenPhoto: () => void
  onClose: () => void
}

function MenuList({ anchorEl, onOpenPhoto, onClose }: MenuListProps) {
  const messages = useMessages()

  return (
    <Menu
      id="user-photo-menu"
      anchorEl={anchorEl}
      open
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={onClose}
    >
      <MenuItem onClick={onOpenPhoto}>
        <AppMenuItemContent icon="photo" text={messages.openText} />
      </MenuItem>
    </Menu>
  )
}

export default MenuList
