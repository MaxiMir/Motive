import { Menu, MenuItem } from '@mui/material'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useMessages } from './hooks/useMessages'

interface MenuListProps {
  anchorEl: HTMLElement
  avatar?: string | null
  onOpen: () => void
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

function MenuList({ anchorEl, avatar, onOpen, onEdit, onDelete, onClose }: MenuListProps) {
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
      onClick={onClose}
      onClose={onClose}
    >
      {avatar && (
        <MenuItem onClick={onOpen}>
          <AppMenuItemContent icon="photo" text={messages.openText} />
        </MenuItem>
      )}
      <MenuItem onClick={onEdit}>
        <AppMenuItemContent icon="edit" text={messages.editText} />
      </MenuItem>
      {avatar && (
        <MenuItem
          sx={{
            '& span': {
              color: 'error.dark',
            },
          }}
          onClick={onDelete}
        >
          <AppMenuItemContent icon="delete" text={messages.deleteText} />
        </MenuItem>
      )}
    </Menu>
  )
}

export default MenuList
