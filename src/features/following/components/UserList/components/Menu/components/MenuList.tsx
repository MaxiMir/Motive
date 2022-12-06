import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import AppMenuItemContent from '@ui/AppMenuItemContent'

interface MenuListProps {
  anchorEl: HTMLElement
  onShare: () => void
  onRemove: () => void
  onClose: () => void
}

function MenuList({ anchorEl, onShare, onRemove, onClose }: MenuListProps) {
  const { formatMessage } = useIntl()
  const shareText = formatMessage({ id: 'common.share' })
  const removeText = formatMessage({ id: 'common.remove' })

  return (
    <Menu id="user-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem onClick={onShare}>
        <AppMenuItemContent icon="share" text={shareText} />
      </MenuItem>
      <MenuItem onClick={onRemove}>
        <AppMenuItemContent icon="remove_circle_outline" text={removeText} />
      </MenuItem>
    </Menu>
  )
}

export default MenuList
