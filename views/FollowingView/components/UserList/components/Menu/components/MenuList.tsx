import { Menu, MenuItem } from '@mui/material'
import i18nCommon from 'constants/i18n'
import { Locale } from 'hooks/useLocale'
import AppMenuItemContent from 'components/ui/AppMenuItemContent'

interface MenuListProps {
  anchorEl: HTMLElement
  locale: Locale
  onShare: () => void
  onRemove: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, locale, onShare, onRemove, onClose }: MenuListProps) {
  const { share, remove } = i18nCommon[locale]

  return (
    <Menu id="user-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem onClick={onShare}>
        <AppMenuItemContent icon="share" text={share} />
      </MenuItem>
      <MenuItem onClick={onRemove}>
        <AppMenuItemContent icon="remove_circle_outline" text={remove} />
      </MenuItem>
    </Menu>
  )
}
