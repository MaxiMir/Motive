import { Divider, Menu, MenuItem } from '@material-ui/core'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

interface MenuListProps {
  anchorEl: HTMLElement
  onShare: () => void
  onRemove: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, onShare, onRemove, onClose }: MenuListProps): JSX.Element {
  return (
    <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
      <MenuItem onClick={onShare}>
        <AppMenuItemContent icon="share" text="Share" />
      </MenuItem>
      <MenuItem onClick={onRemove}>
        <AppMenuItemContent icon="remove_circle_outline" text="Remove" />
      </MenuItem>
      <Divider light />
      <MenuItem onClick={onClose}>
        <AppMenuItemContent icon="not_interested" text="Cancel" />
      </MenuItem>
    </Menu>
  )
}
