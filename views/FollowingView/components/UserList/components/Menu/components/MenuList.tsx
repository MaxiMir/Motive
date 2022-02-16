import { Menu } from '@material-ui/core'
import AppMenuItem from 'components/UI/AppMenuItem'

interface MenuListProps {
  anchorEl: HTMLElement
  onShare: () => void
  onRemove: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, onShare, onRemove, onClose }: MenuListProps): JSX.Element {
  return (
    <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
      <AppMenuItem icon="share" text="Share" onClick={onShare} />
      <AppMenuItem icon="remove_circle_outline" text="Remove" onClick={onRemove} />
      <AppMenuItem icon="not_interested" text="Cancel" onClick={onClose} />
    </Menu>
  )
}
