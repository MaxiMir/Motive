import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import AppMenuItemContent from '@ui/AppMenuItemContent'

interface MenuListProps {
  anchorEl: HTMLElement
  onOpenPhoto: () => void
  onClose: () => void
}

function MenuList({ anchorEl, onOpenPhoto, onClose }: MenuListProps) {
  const { formatMessage } = useIntl()
  const openText = formatMessage({ id: 'common.open' })

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
        <AppMenuItemContent icon="photo" text={openText} />
      </MenuItem>
    </Menu>
  )
}

export default MenuList
