import { Menu } from '@mui/material'
import AppMenuItem from '@ui/AppMenuItem'
import { useMessages } from './hooks/useMessages'

interface MenuActionsProps {
  anchorEl: HTMLElement
  avatar?: string | null
  onOpen: () => void
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

function MenuActions({ anchorEl, avatar, onOpen, onEdit, onDelete, onClose }: MenuActionsProps) {
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
      {avatar && <AppMenuItem icon="photo" text={messages.openText} onClick={onOpen} />}
      <AppMenuItem icon="edit" text={messages.editText} onClick={onEdit} />
      {avatar && (
        <AppMenuItem
          icon="delete"
          text={messages.deleteText}
          color="'error.dark'"
          onClick={onDelete}
        />
      )}
      <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
    </Menu>
  )
}

export default MenuActions
