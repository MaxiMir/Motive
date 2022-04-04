import { Menu, MenuItem } from '@material-ui/core'
import i18n from 'constants/i18n'
import { Locale } from 'hooks/useLocale'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

interface MenuListProps {
  anchorEl: HTMLElement
  locale: Locale
  onShare: () => void
  onRemove: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, locale, onShare, onRemove, onClose }: MenuListProps): JSX.Element {
  const { share, remove } = i18n[locale]

  return (
    <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
      <MenuItem onClick={onShare}>
        <AppMenuItemContent icon="share" text={share} />
      </MenuItem>
      <MenuItem onClick={onRemove}>
        <AppMenuItemContent icon="remove_circle_outline" text={remove} />
      </MenuItem>
    </Menu>
  )
}
